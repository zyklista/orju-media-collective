# API Error Fix - Contact & Merchandise Pages

## Problem

Both Contact and Merchandise pages are showing API errors because:
1. **Missing Environment Variables** - `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are not set
2. **Database Tables** - May not exist or lack proper permissions
3. **Edge Function** - May not be deployed for Contact form Brevo integration

---

## Quick Fix (Choose Based on Environment)

### 🏠 **LOCAL DEVELOPMENT (Localhost/Codespace)**

#### Step 1: Set Environment Variables

A `.env.local` file has been created for you with the correct values:

```bash
# File: .env.local (already created)
VITE_SUPABASE_URL=https://gakgjtaykpflknfmezez.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Step 2: Restart Development Server

```bash
# Stop the current dev server (Ctrl+C)
npm run dev
```

The app will now load with proper Supabase credentials!

---

### 🌐 **VERCEL PRODUCTION/PREVIEW**

#### Step 1: Add Environment Variables to Vercel

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Select your project: `orju-media-collective`
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

| Variable Name | Value | Environments |
|--------------|-------|--------------|
| `VITE_SUPABASE_URL` | `https://gakgjtaykpflknfmezez.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdha2dqdGF5a3BmbGtlZm1lemV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzNjAyNTcsImV4cCI6MjA0NTkzNjI1N30.qEp0qIvDj45SeCy4Sv2LkVXRN2FqPdA1BNGRKKZWzfQ` | Production, Preview, Development |

#### Step 2: Redeploy

After adding env vars, click **Redeploy** or push a new commit to trigger deployment.

---

## Database Setup (If Tables Don't Exist)

### For Contact Form

Run this SQL in Supabase Dashboard:
https://supabase.com/dashboard/project/gakgjtaykpflknfmezez/sql/new

```sql
-- Fix contacts table RLS
ALTER TABLE IF EXISTS public.contacts DISABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE public.contacts TO anon;
GRANT ALL ON TABLE public.contacts TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
```

**If contacts table doesn't exist**, run:
```sql
-- See: supabase/contacts-table-schema.sql
-- Or: supabase/quick-contacts-table.sql
```

### For Merchandise Page

Run this SQL in Supabase Dashboard:

```sql
-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  image_url TEXT,
  sizes TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Disable RLS for public access
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.products TO authenticated;

-- Add sample products
INSERT INTO public.products (name, description, price, image_url, sizes)
VALUES 
  ('Orju Classic T-Shirt', 'Premium cotton t-shirt with Orju Media logo', 25.00, 
   'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop', 
   ARRAY['S', 'M', 'L', 'XL', 'XXL']),
  ('Orju Snapback Cap', 'Adjustable snapback cap with embroidered logo', 20.00,
   'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop',
   ARRAY['One Size']),
  ('Orju Hoodie', 'Comfortable hoodie perfect for creative sessions', 45.00,
   'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop',
   ARRAY['S', 'M', 'L', 'XL', 'XXL'])
ON CONFLICT DO NOTHING;
```

**Or use the existing schema file:**
```bash
# File: supabase/products-table-schema.sql
```

---

## Edge Function Deployment (For Contact → Brevo Integration)

Deploy the Edge Function to enable Brevo email automation:

```bash
supabase functions deploy send-contact-email --project-ref gakgjtaykpflknfmezez
```

**Required Secrets** (should already be set):
- `BREVO_API_KEY`
- `BREVO_API_KEY_LIST_ID`

Check secrets: https://supabase.com/dashboard/project/gakgjtaykpflknfmezez/settings/functions

---

## Verification Steps

### Test Contact Form

1. Open: http://localhost:8080/contact (or your Vercel URL)
2. Open browser console (F12)
3. Fill and submit the form
4. **Expected Console Logs:**
   ```
   Supabase Client Initialization:
   URL: https://gakgjtaykpflknfmezez.supabase.co
   Anon Key: SET
   🚀 Calling Edge Function at: https://...
   📡 Edge Function HTTP status: 200
   ✅ Edge function response: {success: true}
   ```

### Test Merchandise Page

1. Open: http://localhost:8080/merchandise
2. Open browser console (F12)
3. **Expected Console Logs:**
   ```
   🛍️ Merchandise Page - Environment Check:
   VITE_SUPABASE_URL: SET ✓
   VITE_SUPABASE_ANON_KEY: SET ✓
   📦 Fetching products from Supabase...
   ✅ Products fetched successfully: 3 items
   ```

---

## Troubleshooting

### Still Seeing "Configuration Error"?

**Problem:** Environment variables not loaded

**Solution:**
- Local: Make sure `.env.local` exists and restart dev server
- Vercel: Verify env vars are set and redeploy

### Still Seeing "Products table not found"?

**Problem:** Table doesn't exist in database

**Solution:** Run the products table SQL (see Database Setup section above)

### Contact Form Saves but No Brevo Email?

**Problem:** Edge Function not deployed or secrets missing

**Solution:**
1. Deploy function: `supabase functions deploy send-contact-email --project-ref gakgjtaykpflknfmezez`
2. Check secrets are set in Supabase dashboard

### "Invalid API key" Error?

**Problem:** Wrong or missing `VITE_SUPABASE_ANON_KEY`

**Solution:** Double-check the anon key matches your Supabase project

---

## Files Created/Updated

- ✅ `.env.local` - Local environment variables (not in git)
- ✅ `.env.example` - Template for other developers
- ✅ `supabase/fix-contacts-rls.sql` - Contact table permissions fix
- ✅ `supabase/products-table-schema.sql` - Products table setup

---

## Summary

### To Fix Locally:
1. ✅ `.env.local` already created with correct values
2. Run `npm run dev` (restart if already running)
3. Test both pages

### To Fix on Vercel:
1. Add env vars in Vercel dashboard
2. Redeploy
3. Test on live URL

### To Fix Database:
1. Run SQL for contacts table permissions
2. Run SQL for products table creation
3. Verify in Supabase table editor

**After following these steps, both Contact and Merchandise pages should work without API errors!** 🚀
