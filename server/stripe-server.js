import express from 'express'
import Stripe from 'stripe'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const stripeSecret = process.env.STRIPE_SECRET_KEY
if (!stripeSecret) {
  console.warn('STRIPE_SECRET_KEY is not set. The server will fail to create sessions until you set it.')
}

const stripe = new Stripe(stripeSecret || '', { apiVersion: '2022-11-15' })

// Simple static rates to convert USD-based prices to other currencies (same as frontend)
const rates = { USD: 1, CZK: 24, EUR: 0.95, PHP: 58 }

app.post('/create-checkout-session', async (req, res) => {
  const { cart, currency = 'USD', success_url, cancel_url, customer } = req.body || {}

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty or missing' })
  }

  try {
    const line_items = cart.map((it) => {
      const qty = Number(it.quantity) || 1
      const rate = rates[currency] ?? 1
      const unit_amount = Math.round((Number(it.price) * rate) * 100) // cents

      const item = {
        price_data: {
          currency: String(currency).toLowerCase(),
          product_data: {
            name: it.name,
            ...(it.image_url ? { images: [it.image_url] } : {}),
          },
          unit_amount,
        },
        quantity: qty,
      }

      return item
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: success_url || 'http://localhost:5173/buy?success=true',
      cancel_url: cancel_url || 'http://localhost:5173/buy?canceled=true',
      metadata: customer ? { customer: JSON.stringify(customer) } : undefined,
    })

    return res.json({ url: session.url })
  } catch (err) {
    console.error('Stripe session creation failed', err)
    return res.status(500).json({ error: (err && err.message) || String(err) })
  }
})

const PORT = process.env.PORT || 4242
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Stripe server listening on http://localhost:${PORT}`)
})
