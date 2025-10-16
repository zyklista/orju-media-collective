# Deploying Orju Media Collective to Vercel (with Hostinger DNS)

This guide walks through deploying the site to Vercel and pointing your Hostinger-managed domain (orjumedia.com) to the Vercel project. It also covers production settings for Supabase Edge Functions and Stripe.

> Note: Do not store secret keys (Stripe secret, Supabase service role) in your frontend `.env` files or commit them to source control. Use Vercel Environment Variables and Supabase Function Secrets instead.

---

## 1. Create a Vercel project

1. Sign in to https://vercel.com with your GitHub account.
2. Click "New Project" and import the `orju-media-collective` repository.
3. When prompted, accept the detected framework (Vite) and use the default build settings:
   - Framework: Vite
   - Build command: `npm run build` (Vercel will detect this)
   - Output directory: (leave default)
4. Finish the import.

Vercel will create a project and perform an initial deployment.

---

## 2. Add your custom domain(s) to Vercel

1. In the Vercel dashboard, open the project and go to Settings -> Domains.
2. Click "Add" and enter both:
   - `orjumedia.com`
   - `www.orjumedia.com`

Vercel will show instructions to verify ownership and the DNS records you should add at your registrar (Hostinger).

---

## 3. Configure DNS in Hostinger

Hostinger's DNS panel lets you add records for your domain. Vercel will typically instruct either an A-record for the apex domain and a CNAME for `www`, or recommend nameserver delegation.

Example (follow the exact values Vercel shows):

- If Vercel provides A records (IPv4 addresses), add A records for the apex domain (`orjumedia.com`) pointing to those IPs.
- Add a CNAME record for `www` pointing to `cname.vercel-dns.com` (or the specific target shown in Vercel).

DNS example:
```
Type: A
Host: @
Value: 76.76.21.21   # example Vercel IP (use the value Vercel gives)
TTL: Automatic

Type: CNAME
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

Wait for DNS propagation (usually a few minutes; sometimes up to 24 hours).

---

## 4. Vercel environment variables (Production)

Set the following variables in Vercel (Project -> Settings -> Environment Variables):

- `VITE_SUPABASE_URL` = `https://<your-supabase-project>.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = `<your-supabase-anon-key>`

These values are used by the frontend to call Supabase and the Edge Function. Do NOT add `STRIPE_SECRET_KEY` here — keep it server-side.

---

## 5. Supabase Edge Function & Stripe production setup

1. In Supabase Dashboard -> Edge Functions -> create-checkout -> Settings -> Secrets, add:
   - `STRIPE_SECRET_KEY` = `sk_live_...` (your live Stripe secret key)

2. Supabase Auth redirect URLs:
   - In Supabase Dashboard -> Authentication -> Settings -> Redirect URLs, add:
     - `https://orjumedia.com`
     - `https://www.orjumedia.com`
     - Any callback URLs used for Stripe success/cancel flows, e.g. `https://orjumedia.com/?checkout=success`

3. Stripe webhooks (optional but recommended):
   - In Stripe Dashboard -> Developers -> Webhooks, add a new endpoint to receive events like `checkout.session.completed`.
   - Example webhook URL: `https://<your-supabase-project>.supabase.co/functions/v1/stripe-webhook` or a Vercel endpoint if you host a webhook handler there.
   - Register the webhook signing secret in Supabase or Vercel environment for verification.

---

## 6. Deploy and test

1. Push your changes to `main`. Vercel will deploy automatically (or trigger a manual deploy in the Vercel dashboard).
2. Visit `https://orjumedia.com` when DNS is ready.
3. Test the checkout flow:
   - Add an item to the cart and click Checkout.
   - The frontend uses the supabase-js client to call the `create-checkout` Edge Function. The Edge Function will use the `STRIPE_SECRET_KEY` stored in Supabase secrets to create a Stripe Checkout Session and return a `url`.
   - The browser should redirect to Stripe Checkout.

---

## 7. Troubleshooting & logs

- If the function returns 401 on curl but works with both `apikey` and `Authorization` headers, ensure your frontend is using `supabase.functions.invoke` (the supabase client sends the correct headers automatically).
- Check Supabase Edge Functions logs in the Supabase Dashboard for runtime errors.
- Check Vercel deployments and function logs (if you have serverless functions there) in the Vercel dashboard.

---

## 8. Security notes

- Never commit `.env` with secrets.
- Keep `STRIPE_SECRET_KEY` only in server-side secrets (Supabase Function Secrets or Vercel Server Environment if you implement server-side handlers on Vercel). Use the least-privilege keys.

---

If you'd like, I can also:

- Add a `vercel.json` with routing or headers if you plan to host webhooks on Vercel.
- Create a `CNAME` file automatically in the repo for `www.orjumedia.com` (optional; Vercel does not require it for automatic setup).
- Walk you through the Hostinger UI step-by-step if you paste the DNS values that Vercel shows.

*** End of DEPLOY.md
