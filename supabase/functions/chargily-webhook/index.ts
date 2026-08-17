import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const CHARGILY_SECRET_KEY = Deno.env.get('CHARGILY_SECRET_KEY')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

async function verifySignature(rawBody: string, signatureHeader: string): Promise<boolean> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(CHARGILY_SECRET_KEY),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(rawBody))
  const computedSignature = Array.from(new Uint8Array(signatureBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

  return computedSignature === signatureHeader
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  // نقرأ الجسم كنص خام أولاً — ضروري جداً للتحقق من التوقيع بدقة
  const rawBody = await req.text()
  const signatureHeader = req.headers.get('signature')

  if (!signatureHeader) {
    return new Response('Missing signature', { status: 400 })
  }

  const isValid = await verifySignature(rawBody, signatureHeader)
  if (!isValid) {
    console.error('Invalid webhook signature')
    return new Response('Invalid signature', { status: 403 })
  }

  const event = JSON.parse(rawBody)

  if (event.type !== 'checkout.paid') {
    // نوع حدث آخر (مثلاً فشل الدفع) — نتجاهله حالياً، ونؤكد الاستلام فقط
    return new Response(JSON.stringify({ received: true }), { status: 200 })
  }

  const metadata = event.data?.metadata
  const shopId = metadata?.shop_id
  const months = parseInt(metadata?.months)

  if (!shopId || !months) {
    console.error('Missing metadata in webhook', event.data)
    return new Response(JSON.stringify({ received: true }), { status: 200 })
  }

  // عميل بصلاحيات كاملة (Service Role) — يتجاوز RLS، يُستعمل فقط هنا داخل خادم موثوق
  const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  const { data: shop } = await supabaseAdmin
    .from('shops')
    .select('subscription_status, subscription_expires_at')
    .eq('id', shopId)
    .single()

  const now = new Date()
  let baseDate = now

  // إذا كان الاشتراك نشطاً ولم ينتهِ بعد، نمدّد من تاريخ انتهائه الحالي (وليس من اليوم)
  if (shop?.subscription_status === 'active' && shop?.subscription_expires_at) {
    const currentExpiry = new Date(shop.subscription_expires_at)
    if (currentExpiry > now) baseDate = currentExpiry
  }

  const newExpiry = new Date(baseDate)
  newExpiry.setMonth(newExpiry.getMonth() + months)

  const { error: updateError } = await supabaseAdmin
    .from('shops')
    .update({
      subscription_status: 'active',
      subscription_expires_at: newExpiry.toISOString()
    })
    .eq('id', shopId)

  if (updateError) {
    console.error('Failed to update shop', updateError)
    return new Response(JSON.stringify({ error: 'Update failed' }), { status: 500 })
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 })
})