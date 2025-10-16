import { serve } from 'https://deno.land/std@0.203.0/http/server.ts'

const RATES: Record<string, number> = { USD: 1, CZK: 24, EUR: 0.95, PHP: 58 }

serve(async (req: Request) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }

  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers })
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers })

  const stripeKey = Deno.env.get('STRIPE_SECRET_KEY') || Deno.env.get('STRIPE_API_KEY') || ''
  if (!stripeKey) {
    // Return a clear error that tells the operator what is missing (do not include secret value)
    return new Response(JSON.stringify({ error: 'Stripe secret key not configured in Function secrets (STRIPE_SECRET_KEY)' }), { status: 500, headers })
  }

  // Helpful debugging: surface which authentication header was provided (do not log secret values)
  const providedApiKey = req.headers.get('apikey') || req.headers.get('authorization') || null
  if (!providedApiKey) {
    return new Response(JSON.stringify({ error: 'No apikey/authorization header provided. When calling externally include the Supabase project anon key as `apikey` header or invoke via supabase-js.' }), { status: 401, headers })
  }

  let body: any
  try {
    body = await req.json()
  } catch (_) {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400, headers })
  }

  const { cart = [], currency = 'USD', success_url, cancel_url, customer } = body
  if (!Array.isArray(cart) || cart.length === 0) return new Response(JSON.stringify({ error: 'Cart is empty or missing' }), { status: 400, headers })
  if (cart.length > 100) return new Response(JSON.stringify({ error: 'Cart too large' }), { status: 400, headers })

  const safeCurrency = String(currency || 'USD').toUpperCase()
  const baseUrl = new URL(req.url)
  const success = success_url ? String(success_url) : new URL('/', baseUrl).toString()
  const cancel = cancel_url ? String(cancel_url) : new URL('/cart', baseUrl).toString()

  const params = new URLSearchParams()
  params.append('mode', 'payment')
  params.append('payment_method_types[]', 'card')
  params.append('success_url', success)
  params.append('cancel_url', cancel)

  for (let i = 0; i < cart.length; i++) {
    const it = cart[i]
    const qty = Math.max(1, Number(it.quantity) || 1)
    const priceNum = Number(it.price)
    if (!isFinite(priceNum) || priceNum < 0) return new Response(JSON.stringify({ error: `Invalid price at index ${i}` }), { status: 400, headers })
    const rate = RATES[safeCurrency] ?? 1
    const unit_amount = Math.round(priceNum * rate * 100)
    if (unit_amount < 1) return new Response(JSON.stringify({ error: `Amount too small at index ${i}` }), { status: 400, headers })

    params.append(`line_items[${i}][price_data][currency]`, String(safeCurrency).toLowerCase())
    params.append(`line_items[${i}][price_data][product_data][name]`, String(it.name || 'Item'))
    if (it.image_url) params.append(`line_items[${i}][price_data][product_data][images][]`, String(it.image_url))
    params.append(`line_items[${i}][price_data][unit_amount]`, String(unit_amount))
    params.append(`line_items[${i}][quantity]`, String(qty))
  }

  if (customer) params.append('metadata[customer]', JSON.stringify(customer))

  try {
    const resp = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${stripeKey}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })

  const jsonResp = await resp.json()
  if (!resp.ok) return new Response(JSON.stringify({ error: jsonResp }), { status: 502, headers })
  // Stripe returns a session URL on success; return it to the client.
  return new Response(JSON.stringify({ url: jsonResp.url || null, raw: jsonResp }), { status: 200, headers })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers })
  }
})
