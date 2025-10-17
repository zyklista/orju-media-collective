-- Minimal contacts table setup for quick creation
-- Copy this entire block and paste into Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.contacts (
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company_website VARCHAR(500),
  job_title VARCHAR(255) NOT NULL,
  region VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  budget VARCHAR(100),
  hear_about VARCHAR(255) NOT NULL,
  stay_in_touch BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contacts_email ON public.contacts(email);
CREATE INDEX idx_contacts_created_at ON public.contacts(created_at DESC);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert" ON public.contacts
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON public.contacts
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow service role full access" ON public.contacts
  FOR ALL TO service_role USING (true) WITH CHECK (true);
