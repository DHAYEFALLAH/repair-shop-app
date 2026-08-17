import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const CHARGILY_SECRET_KEY = Deno.env.get('CHARGILY_SECRET_KEY')!
const CHARGILY_BASE_URL = 'https://pay.chargily.net/test/api/v2' // نبدّلها لاحقاً للوضع الحقيقي
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!
const PRICE_PER_MONTH_DZD = 500

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization' }), { status: 401, headers: corsHeaders })
    }

    // عميل يتحقق من هوية المستخدم عبر التوكن اللي بعثو من الواجهة
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } }
    })

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders })
    }

    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('shop_id, role')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return new Response(JSON.stringify({ error: 'Profile not found' }), { status: 404, headers: corsHeaders })
    }

    if (profile.role !== 'owner') {
      return new Response(JSON.stringify({ error: 'Only the shop owner can manage billing' }), { status: 403, headers: corsHeaders })
    }

    const body = await req.json()
    const months = parseInt(body.months)
    if (!months || months < 1 || months > 24) {
      return new Response(JSON.stringify({ error: 'Invalid months' }), { status: 400, headers: corsHeaders })
    }

    const amount = months * PRICE_PER_MONTH_DZD
    const origin = req.headers.get('origin') || ''

    const chargilyResponse = await fetch(`${CHARGILY_BASE_URL}/checkouts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CHARGILY_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: amount,
        currency: 'dzd',
        success_url: `${origin}/billing-success.html`,
        failure_url: `${origin}/billing-failed.html`,
        description: `اشتراك ${months} شهر`,
        metadata: { shop_id: profile.shop_id, months: months }
      })
    })

    const chargilyData = await chargilyResponse.json()

    if (!chargilyResponse.ok) {
      console.error('Chargily error', chargilyData)
      return new Response(JSON.stringify({ error: 'Payment gateway error' }), { status: 502, headers: corsHeaders })
    }

    return new Response(JSON.stringify({ checkout_url: chargilyData.checkout_url }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500, headers: corsHeaders })
  }
})