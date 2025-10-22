# Merchandise Page Fix - Setup Instructions

## What Was Fixed

1. **Enhanced Error Handling** in `src/pages/Merchandise.tsx`:
   - Better environment variable validation
   - Detailed console logging for debugging
   - User-friendly error messages
   - Graceful handling of different error types

2. **Created Products Table Schema** (`supabase/products-table-schema.sql`):
   - Full table definition with proper types
   - Sample products (T-shirt, Cap, Hoodie)
   - RLS disabled for public access
   - Permissions granted to anon users

## To Fix the API Error - Choose ONE method:

### Method 1: Run SQL in Supabase Dashboard (RECOMMENDED)

1. **Open Supabase SQL Editor**:
   ```
   https://supabase.com/dashboard/project/gakgjtaykpflknfmezez/sql/new
   ```

2. **Copy the entire contents** of `supabase/products-table-schema.sql`

3. **Paste and Run** in the SQL editor

4. **Verify**: You should see "Products table setup complete!" with 3 products

### Method 2: Quick Copy-Paste

Run this in your Supabase SQL editor:

```sql
-- Products Table Schema
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

ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.products TO authenticated;
CREATE INDEX IF NOT EXISTS products_created_at_idx ON public.products(created_at DESC);

-- Sample products
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

## Verify Environment Variables (If Still Getting Errors)

The merchandise page now checks for these environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### For Vercel Deployment:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables

2. Verify both variables are set for **all environments** (Production, Preview, Development)

3. If missing or incorrect, add them and **Redeploy**

### For Local Development:

Create/update `.env` file in project root:
```env
VITE_SUPABASE_URL=https://gakgjtaykpflknfmezez.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Testing After Fix

1. **Check Browser Console** (F12):
   - Should see: `🛍️ Merchandise Page - Environment Check:`
   - Should see: `VITE_SUPABASE_URL: SET ✓`
   - Should see: `✅ Products fetched successfully: 3 items`

2. **Merchandise Page** should now display 3 products with images

3. **No more API errors!**

## Troubleshooting

### Still seeing "Invalid API key"?
- Environment variables not set correctly in Vercel
- Need to redeploy after adding env vars

### Seeing "Products table not found"?
- Run the SQL script above in Supabase dashboard

### Seeing "No products available"?
- Table exists but is empty
- Run the INSERT statements from the SQL above

## Next Steps

After fixing the merchandise page, you mentioned connecting the **Careers page** buttons to Brevo. Let me know when you're ready for that!
