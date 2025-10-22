-- Products Table Schema for Orju Media Collective
-- This creates the products table for the merchandise store

-- Create products table if it doesn't exist
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

-- Disable RLS (for public access)
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;

-- Grant permissions to anonymous users
GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.products TO authenticated;

-- Create index for performance
CREATE INDEX IF NOT EXISTS products_created_at_idx ON public.products(created_at DESC);

-- Insert sample products if table is empty
INSERT INTO public.products (name, description, price, image_url, sizes)
SELECT 
  'Orju Classic T-Shirt',
  'Premium cotton t-shirt with Orju Media logo',
  25.00,
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop',
  ARRAY['S', 'M', 'L', 'XL', 'XXL']
WHERE NOT EXISTS (SELECT 1 FROM public.products LIMIT 1);

INSERT INTO public.products (name, description, price, image_url, sizes)
SELECT 
  'Orju Snapback Cap',
  'Adjustable snapback cap with embroidered logo',
  20.00,
  'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop',
  ARRAY['One Size']
WHERE (SELECT COUNT(*) FROM public.products) < 2;

INSERT INTO public.products (name, description, price, image_url, sizes)
SELECT 
  'Orju Hoodie',
  'Comfortable hoodie perfect for creative sessions',
  45.00,
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop',
  ARRAY['S', 'M', 'L', 'XL', 'XXL']
WHERE (SELECT COUNT(*) FROM public.products) < 3;

-- Show success message
SELECT 
  'Products table setup complete!' as message,
  COUNT(*) as total_products
FROM public.products;
