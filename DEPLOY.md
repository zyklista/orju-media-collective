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

## 8. Domain not showing / Blank page issues

If your domain shows nothing or a blank page, follow these steps:

### A. Check DNS Propagation
```bash
# Check if DNS is pointing to Vercel
nslookup orjumedia.com
dig orjumedia.com
```

### B. Verify Vercel Configuration
1. In Vercel Dashboard -> Settings -> Domains, ensure:
   - `orjumedia.com` shows as "Valid Configuration" ✓
   - `www.orjumedia.com` shows as "Valid Configuration" ✓
2. Check Recent Deployments:
   - Go to Deployments tab
   - Ensure latest deployment is "Ready" (not "Failed" or "Building")
   - Click on deployment -> View Build Logs for any errors

### C. Check Build Output
Ensure your build is producing files correctly:
1. Run `npm run build` locally
2. Check that `dist/` folder contains:
   - `index.html`
   - `assets/` folder with JS/CSS files
3. If build fails, fix errors before deploying

### D. SPA Routing Configuration
The `vercel.json` file (now created) ensures all routes redirect to `index.html` for proper React Router navigation. This fixes:
- Direct URL access (e.g., `orjumedia.com/about`)
- Page refreshes on sub-routes
- 404 errors on navigation

### E. Check Environment Variables
In Vercel Dashboard -> Settings -> Environment Variables:
1. Ensure all required variables are set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
2. Click "Redeploy" after adding variables

### F. Clear Browser Cache
1. Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. Or open in Incognito/Private mode
3. Or clear browser cache completely

### G. Check Vercel Build Settings
In Vercel Dashboard -> Settings -> General:
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### H. Force Redeploy
1. Go to Deployments tab
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Check "Use existing Build Cache" (uncheck if having issues)

### I. Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors (red messages)
4. Check Network tab for failed requests

### J. Hostinger DNS Settings (Example)
```
Type: A
Host: @ (or leave blank for root domain)
Points to: 76.76.21.21 (use the IP Vercel provides)
TTL: 14400 (or Automatic)

Type: CNAME  
Host: www
Points to: cname.vercel-dns.com
TTL: 14400 (or Automatic)
```

**Note:** Use the EXACT values shown in your Vercel dashboard, not these examples!

---

## 9. Deploy Supabase Edge Functions

The contact form uses a Supabase Edge Function to send data to Brevo (Sendinblue) for email automation and contact management.

### A. Deploy the Edge Function

1. Install Supabase CLI if you haven't already:
```bash
npm install -g supabase
```

2. Login to Supabase:
```bash
supabase login
```

3. Link your project (replace with your project reference):
```bash
supabase link --project-ref your-project-ref
```

4. Deploy the function:
```bash
supabase functions deploy send-contact-email
```

### B. Set Required Secrets

The Edge Function requires two secrets to be set in Supabase:

1. **BREVO_API_KEY**: Your Brevo (Sendinblue) API key
   - Get this from: https://app.brevo.com/settings/keys/api
   - Should look like: `xkeysib-xxxxxxxxxxxxx...`

2. **BREVO_API_KEY_LIST_ID**: The Brevo list ID for marketing contacts
   - Get this from: https://app.brevo.com/contact/list
   - Click on your list and find the ID in the URL (e.g., `2`, `5`, `10`)
   - Contacts who check "stay in touch" will be automatically added to this list

Set the secrets using Supabase CLI:

```bash
# Set Brevo API Key
supabase secrets set BREVO_API_KEY=xkeysib-your-actual-api-key-here

# Set Brevo List ID (the numeric ID of your marketing list)
supabase secrets set BREVO_API_KEY_LIST_ID=2
```

Or set them via the Supabase Dashboard:
1. Go to https://supabase.com/dashboard/project/YOUR_PROJECT/settings/functions
2. Click "Edge Functions" in the sidebar
3. Click "Manage secrets"
4. Add both secrets

### C. Verify Function Deployment

Test the function after deployment:

```bash
# Test locally first
supabase functions serve send-contact-email

# In another terminal, test with curl
curl -X POST http://localhost:54321/functions/v1/send-contact-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User",
    "stayInTouch": true
  }'
```

### D. How the Contact Form Works

When a user submits the contact form:

1. **Frontend (Contact.tsx)**: 
   - Validates all required fields
   - Inserts contact data into Supabase `contacts` table
   - Invokes the `send-contact-email` Edge Function

2. **Edge Function (send-contact-email)**:
   - Creates/updates contact in Brevo with all details
   - If user checked "stay in touch", adds them to your Brevo marketing list (ID from `BREVO_API_KEY_LIST_ID`)
   - Sends notification email to `hello@orjumedia.com` with submission details

3. **Brevo**:
   - Stores contact with attributes (name, company, job title, region, etc.)
   - Adds to list for newsletter/marketing (if opted in)
   - Delivers notification email to your team

### E. Brevo Configuration

Make sure in your Brevo account:

1. **Verify sender email**: `noreply@orjumedia.com` must be verified in Brevo
2. **Create a list**: For marketing contacts (get the list ID)
3. **API key permissions**: Make sure your API key has permissions for:
   - Contacts management
   - Transactional emails (SMTP)

---

## 10. Security notes

- Never commit `.env` with secrets.
- Keep `STRIPE_SECRET_KEY` only in server-side secrets (Supabase Function Secrets or Vercel Server Environment if you implement server-side handlers on Vercel). Use the least-privilege keys.
- Keep `BREVO_API_KEY` and `BREVO_API_KEY_LIST_ID` only in Supabase Function Secrets, never in frontend environment variables.
- Use Row Level Security (RLS) on your Supabase `contacts` table if needed.

---

If you'd like, I can also:

- Add a `vercel.json` with routing or headers if you plan to host webhooks on Vercel.
- Create a `CNAME` file automatically in the repo for `www.orjumedia.com` (optional; Vercel does not require it for automatic setup).
- Walk you through the Hostinger UI step-by-step if you paste the DNS values that Vercel shows.

*** End of DEPLOY.md
