#!/bin/bash
# Simple script to display SQL that can be copy-pasted into Supabase Dashboard

echo "================================================"
echo "✨ CONTACTS TABLE SETUP FOR SUPABASE"
echo "================================================"
echo ""
echo "📋 Follow these steps:"
echo ""
echo "1. Go to: https://supabase.com/dashboard/project/gakgjtaykpflknfmezez/editor"
echo "2. Click 'SQL Editor' in the left sidebar"
echo "3. Click 'New query' button"
echo "4. Copy the SQL from: supabase/contacts-table-schema.sql"
echo "5. Paste it into the SQL editor"
echo "6. Click 'Run' (or press Ctrl/Cmd + Enter)"
echo ""
echo "================================================"
echo "OR use this quick minimal setup:"
echo "================================================"
echo ""

cat << 'EOF'
-- QUICK SETUP: Copy everything below this line
-- ============================================

-- Create the contacts table
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_contacts_email ON public.contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_stay_in_touch ON public.contacts(stay_in_touch) WHERE stay_in_touch = true;

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for contact form)
CREATE POLICY "Allow anonymous insert" ON public.contacts
  FOR INSERT TO anon WITH CHECK (true);

-- Allow authenticated users to read
CREATE POLICY "Allow authenticated read" ON public.contacts
  FOR SELECT TO authenticated USING (true);

-- Allow service role full access (for Edge Functions)
CREATE POLICY "Allow service role full access" ON public.contacts
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Auto-update trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_contacts_updated_at ON public.contacts;
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON public.contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- ✅ Table created successfully!
-- ============================================
EOF

echo ""
echo "================================================"
echo "✅ After running the SQL, verify with:"
echo "================================================"
echo ""
echo "SELECT * FROM public.contacts LIMIT 1;"
echo ""
echo "================================================"
