-- ============================================
-- Contacts Table Schema for Orju Media
-- ============================================
-- This table stores contact form submissions from the website
-- Integrated with Brevo (Sendinblue) via Edge Function

-- Create the contacts table
CREATE TABLE IF NOT EXISTS public.contacts (
  -- Primary key
  id BIGSERIAL PRIMARY KEY,
  
  -- Contact information
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company_website VARCHAR(500),
  job_title VARCHAR(255) NOT NULL,
  
  -- Location and category
  region VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  
  -- Message details
  message TEXT NOT NULL,
  budget VARCHAR(100),
  hear_about VARCHAR(255) NOT NULL,
  
  -- Marketing opt-in
  stay_in_touch BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Indexes for better query performance
-- ============================================

-- Index on email for quick lookups
CREATE INDEX IF NOT EXISTS idx_contacts_email ON public.contacts(email);

-- Index on created_at for sorting by date
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);

-- Index on stay_in_touch to filter marketing contacts
CREATE INDEX IF NOT EXISTS idx_contacts_stay_in_touch ON public.contacts(stay_in_touch) WHERE stay_in_touch = true;

-- Index on category for filtering by inquiry type
CREATE INDEX IF NOT EXISTS idx_contacts_category ON public.contacts(category);

-- Composite index for filtering by region and category
CREATE INDEX IF NOT EXISTS idx_contacts_region_category ON public.contacts(region, category);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to INSERT contacts (form submissions)
-- This allows the contact form to work without authentication
CREATE POLICY "Allow anonymous insert" ON public.contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to view all contacts
-- This is for your team/admin dashboard
CREATE POLICY "Allow authenticated read" ON public.contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow service role full access (for Edge Functions)
-- This ensures Edge Functions can read/write as needed
CREATE POLICY "Allow service role full access" ON public.contacts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================
-- Function: Auto-update updated_at timestamp
-- ============================================

-- Create function to update the updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_contacts_updated_at ON public.contacts;
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON public.contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- Comments for documentation
-- ============================================

COMMENT ON TABLE public.contacts IS 'Stores contact form submissions from the website';
COMMENT ON COLUMN public.contacts.id IS 'Unique identifier for each contact submission';
COMMENT ON COLUMN public.contacts.first_name IS 'Contact''s first name';
COMMENT ON COLUMN public.contacts.last_name IS 'Contact''s last name';
COMMENT ON COLUMN public.contacts.email IS 'Contact''s email address';
COMMENT ON COLUMN public.contacts.company_website IS 'Company website URL (optional)';
COMMENT ON COLUMN public.contacts.job_title IS 'Contact''s job title';
COMMENT ON COLUMN public.contacts.region IS 'Geographic region (Philippines, Canada, USA, Europe, Czech Republic, Other)';
COMMENT ON COLUMN public.contacts.category IS 'Inquiry category (General Inquiry, Partnership, Media Services, Careers, Other)';
COMMENT ON COLUMN public.contacts.message IS 'Main message/inquiry from the contact';
COMMENT ON COLUMN public.contacts.budget IS 'Project budget range (optional)';
COMMENT ON COLUMN public.contacts.hear_about IS 'How they heard about Orju Media';
COMMENT ON COLUMN public.contacts.stay_in_touch IS 'Whether contact opted in for marketing communications';
COMMENT ON COLUMN public.contacts.created_at IS 'Timestamp when contact was submitted';
COMMENT ON COLUMN public.contacts.updated_at IS 'Timestamp when contact was last updated';

-- ============================================
-- Sample Queries
-- ============================================

-- Get all contacts who want to stay in touch (for marketing)
-- SELECT * FROM public.contacts WHERE stay_in_touch = true ORDER BY created_at DESC;

-- Get contacts by region
-- SELECT * FROM public.contacts WHERE region = 'Philippines' ORDER BY created_at DESC;

-- Get contacts by category
-- SELECT * FROM public.contacts WHERE category = 'Media Services' ORDER BY created_at DESC;

-- Get recent contacts (last 30 days)
-- SELECT * FROM public.contacts WHERE created_at >= NOW() - INTERVAL '30 days' ORDER BY created_at DESC;

-- Count contacts by region
-- SELECT region, COUNT(*) as count FROM public.contacts GROUP BY region ORDER BY count DESC;

-- Count contacts who opted in for marketing
-- SELECT COUNT(*) FROM public.contacts WHERE stay_in_touch = true;

-- Get contacts with budget information
-- SELECT * FROM public.contacts WHERE budget IS NOT NULL AND budget != '' ORDER BY created_at DESC;

-- ============================================
-- Optional: Add email validation constraint
-- ============================================

-- Uncomment to add basic email format validation
-- ALTER TABLE public.contacts 
--   ADD CONSTRAINT email_format_check 
--   CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- ============================================
-- Optional: Create a view for marketing contacts
-- ============================================

CREATE OR REPLACE VIEW public.marketing_contacts AS
SELECT 
  id,
  first_name,
  last_name,
  email,
  company_website,
  job_title,
  region,
  created_at
FROM public.contacts
WHERE stay_in_touch = true
ORDER BY created_at DESC;

COMMENT ON VIEW public.marketing_contacts IS 'View of contacts who opted in for marketing communications';

-- Grant access to the view
GRANT SELECT ON public.marketing_contacts TO authenticated;

-- ============================================
-- Optional: Create a view for contact statistics
-- ============================================

CREATE OR REPLACE VIEW public.contact_stats AS
SELECT 
  COUNT(*) as total_contacts,
  COUNT(*) FILTER (WHERE stay_in_touch = true) as marketing_opt_ins,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as last_7_days,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as last_30_days,
  COUNT(DISTINCT region) as unique_regions,
  COUNT(DISTINCT category) as unique_categories
FROM public.contacts;

COMMENT ON VIEW public.contact_stats IS 'Statistics about contact form submissions';

-- Grant access to the stats view
GRANT SELECT ON public.contact_stats TO authenticated;

-- ============================================
-- Verification Queries
-- ============================================

-- Verify the table was created successfully
-- SELECT column_name, data_type, is_nullable, column_default
-- FROM information_schema.columns
-- WHERE table_schema = 'public' AND table_name = 'contacts'
-- ORDER BY ordinal_position;

-- Verify indexes
-- SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'contacts';

-- Verify RLS is enabled
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'contacts';

-- Verify policies
-- SELECT policyname, permissive, roles, cmd, qual FROM pg_policies WHERE tablename = 'contacts';
