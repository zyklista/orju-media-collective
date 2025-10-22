-- Career Applications Table Schema
-- Stores all job applications submitted through the careers page

CREATE TABLE IF NOT EXISTS public.career_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  position TEXT NOT NULL,
  department TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  cover_letter TEXT,
  resume_url TEXT,
  stay_in_touch BOOLEAN DEFAULT false,
  brevo_contact_id TEXT,
  application_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS career_applications_email_idx ON public.career_applications(email);
CREATE INDEX IF NOT EXISTS career_applications_position_idx ON public.career_applications(position);
CREATE INDEX IF NOT EXISTS career_applications_created_at_idx ON public.career_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS career_applications_status_idx ON public.career_applications(application_status);

-- Disable RLS for now (enable with proper policies in production)
ALTER TABLE public.career_applications DISABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT INSERT, SELECT ON public.career_applications TO anon;
GRANT ALL ON public.career_applications TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Create a view for HR to see application summaries
CREATE OR REPLACE VIEW public.career_applications_summary AS
SELECT 
  id,
  first_name || ' ' || last_name as full_name,
  email,
  phone,
  position,
  department,
  application_status,
  created_at,
  CASE WHEN resume_url IS NOT NULL THEN 'Yes' ELSE 'No' END as has_resume,
  CASE WHEN cover_letter IS NOT NULL THEN 'Yes' ELSE 'No' END as has_cover_letter
FROM public.career_applications
ORDER BY created_at DESC;

-- Grant view permissions
GRANT SELECT ON public.career_applications_summary TO authenticated;

COMMENT ON TABLE public.career_applications IS 'Stores career applications submitted through the website';
COMMENT ON COLUMN public.career_applications.application_status IS 'pending, reviewing, interviewed, rejected, hired';
