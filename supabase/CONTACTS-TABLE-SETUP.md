# Contacts Table Setup Guide

This guide will help you set up the `contacts` table in your Supabase database.

## Quick Setup (Copy-Paste)

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/gakgjtaykpflknfmezez/editor
2. Click on "SQL Editor" in the left sidebar
3. Click "New query"
4. Copy and paste the contents of `contacts-table-schema.sql`
5. Click "Run" or press `Ctrl/Cmd + Enter`

### Option 2: Using Supabase CLI

```bash
# Make sure you're linked to your project
npx supabase link --project-ref gakgjtaykpflknfmezez

# Run the migration
npx supabase db execute -f supabase/contacts-table-schema.sql
```

## Minimal Setup (If you just want the basics)

If you want a simpler setup without views and extra indexes, use this:

```sql
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

-- Enable RLS
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for contact form)
CREATE POLICY "Allow anonymous insert" ON public.contacts
  FOR INSERT TO anon WITH CHECK (true);

-- Allow authenticated users to read
CREATE POLICY "Allow authenticated read" ON public.contacts
  FOR SELECT TO authenticated USING (true);
```

## Table Structure

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `id` | BIGSERIAL | Auto | Unique identifier |
| `first_name` | VARCHAR(255) | Yes | First name |
| `last_name` | VARCHAR(255) | Yes | Last name |
| `email` | VARCHAR(255) | Yes | Email address |
| `company_website` | VARCHAR(500) | No | Company website |
| `job_title` | VARCHAR(255) | Yes | Job title |
| `region` | VARCHAR(100) | Yes | Geographic region |
| `category` | VARCHAR(100) | Yes | Inquiry category |
| `message` | TEXT | Yes | Main message |
| `budget` | VARCHAR(100) | No | Project budget |
| `hear_about` | VARCHAR(255) | Yes | How they heard about you |
| `stay_in_touch` | BOOLEAN | No (default: false) | Marketing opt-in |
| `created_at` | TIMESTAMPTZ | Auto | Submission timestamp |
| `updated_at` | TIMESTAMPTZ | Auto | Last update timestamp |

## Field Values

### Region Options
- Philippines
- Canada
- USA
- Europe
- Czech Republic
- Other

### Category Options
- General Inquiry
- Partnership
- Media Services
- Careers
- Other

## Security (Row Level Security)

The schema includes RLS policies to:

✅ **Allow anonymous users to INSERT** - So the contact form works without login
✅ **Allow authenticated users to SELECT** - So your team can view submissions
✅ **Allow service role full access** - So Edge Functions can read/write

## Useful Queries

### View all contacts
```sql
SELECT * FROM public.contacts ORDER BY created_at DESC;
```

### View contacts who want marketing emails
```sql
SELECT * FROM public.contacts 
WHERE stay_in_touch = true 
ORDER BY created_at DESC;
```

### View contacts by region
```sql
SELECT * FROM public.contacts 
WHERE region = 'Philippines' 
ORDER BY created_at DESC;
```

### Count contacts by category
```sql
SELECT category, COUNT(*) as count 
FROM public.contacts 
GROUP BY category 
ORDER BY count DESC;
```

### Recent contacts (last 7 days)
```sql
SELECT * FROM public.contacts 
WHERE created_at >= NOW() - INTERVAL '7 days' 
ORDER BY created_at DESC;
```

## Verification

After running the schema, verify it's set up correctly:

### 1. Check table exists
```sql
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'contacts' 
ORDER BY ordinal_position;
```

### 2. Check RLS is enabled
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'contacts';
```
Should return `rowsecurity = true`

### 3. Check policies
```sql
SELECT policyname, roles, cmd 
FROM pg_policies 
WHERE tablename = 'contacts';
```
Should show policies for `anon` and `authenticated` roles.

### 4. Test insert (should work)
```sql
INSERT INTO public.contacts (
  first_name, last_name, email, job_title, 
  region, category, message, hear_about, stay_in_touch
) VALUES (
  'Test', 'User', 'test@example.com', 'Tester',
  'USA', 'General Inquiry', 'Test message', 'Google', true
);
```

## Troubleshooting

### "permission denied for table contacts"
- Make sure RLS policies are created
- Check you're using the correct role (anon for inserts)

### "relation does not exist"
- Make sure the table was created in the `public` schema
- Run the CREATE TABLE statement

### Contact form not saving
- Check browser console for errors
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Check Supabase table permissions

## Views Included

The full schema includes helpful views:

### `marketing_contacts` - View marketing opt-ins
```sql
SELECT * FROM public.marketing_contacts;
```

### `contact_stats` - View statistics
```sql
SELECT * FROM public.contact_stats;
```

## Next Steps

After setting up the table:

1. ✅ Run the SQL schema
2. ✅ Verify table exists in Supabase Dashboard
3. ✅ Test contact form on your site
4. ✅ Check that submissions appear in the table
5. ✅ Verify Brevo integration is working
6. ✅ Monitor contacts who opt-in for marketing

## Additional Resources

- Full schema: `supabase/contacts-table-schema.sql`
- Supabase RLS docs: https://supabase.com/docs/guides/auth/row-level-security
- Edge Function docs: `supabase/functions/send-contact-email/README.md`
