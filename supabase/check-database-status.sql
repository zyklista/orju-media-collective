-- Quick SQL to check if everything is ready for careers integration

-- Check if career_applications table exists
SELECT 
  CASE 
    WHEN EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'career_applications'
    )
    THEN '✓ career_applications table exists'
    ELSE '✗ career_applications table NOT FOUND - Run career-applications-schema.sql'
  END as table_status;

-- Check if products table exists (for merchandise)
SELECT 
  CASE 
    WHEN EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'products'
    )
    THEN '✓ products table exists'
    ELSE '✗ products table NOT FOUND - Run products-table-schema.sql'
  END as products_status;

-- Check if contacts table exists
SELECT 
  CASE 
    WHEN EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'contacts'
    )
    THEN '✓ contacts table exists'
    ELSE '✗ contacts table NOT FOUND'
  END as contacts_status;

-- Show sample data if tables exist
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'career_applications') THEN
    RAISE NOTICE '--- Career Applications ---';
    PERFORM * FROM career_applications LIMIT 5;
  END IF;
  
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'products') THEN
    RAISE NOTICE '--- Products ---';
    PERFORM * FROM products LIMIT 5;
  END IF;
END $$;
