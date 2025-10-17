# Contacts Table RLS (Row Level Security) Policies

## Current Status
⚠️ **RLS is currently DISABLED** - This shows as "unrestricted" in the dashboard and is **NOT SECURE** for production.

## Why RLS is Important
- **Without RLS**: Anyone can read, insert, update, or delete ANY data in the table
- **With RLS**: Access is controlled by policies - only allowed operations work

## Secure RLS Setup for Production

### Run this SQL to enable secure policies:

```sql
-- Enable RLS
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Enable insert for everyone" ON public.contacts;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON public.contacts;
DROP POLICY IF EXISTS "Enable all for service role" ON public.contacts;

-- Policy 1: Allow anyone to INSERT (for contact form)
-- This allows your public form to submit contacts
CREATE POLICY "Allow public contact submissions"
ON public.contacts
FOR INSERT
TO public
WITH CHECK (true);

-- Policy 2: Allow authenticated users to READ
-- This allows your team/admin to view contacts
CREATE POLICY "Allow authenticated users to view contacts"
ON public.contacts
FOR SELECT
TO authenticated
USING (true);

-- Policy 3: Allow service role full access
-- This allows Edge Functions and backend operations
CREATE POLICY "Allow service role full access"
ON public.contacts
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
```

## What Each Policy Does

### Policy 1: Public Contact Submissions
```sql
CREATE POLICY "Allow public contact submissions"
ON public.contacts FOR INSERT TO public WITH CHECK (true);
```
- **Who**: `public` (anyone, including anonymous users)
- **What**: `INSERT` only
- **Why**: Allows your contact form to work without requiring users to log in
- **Security**: ✅ Safe - users can only ADD contacts, not read/modify/delete

### Policy 2: Authenticated Read Access
```sql
CREATE POLICY "Allow authenticated users to view contacts"
ON public.contacts FOR SELECT TO authenticated USING (true);
```
- **Who**: `authenticated` (logged-in users only)
- **What**: `SELECT` (read) only
- **Why**: Your team can view submitted contacts
- **Security**: ✅ Safe - only your authenticated team members can see contact data

### Policy 3: Service Role Full Access
```sql
CREATE POLICY "Allow service role full access"
ON public.contacts FOR ALL TO service_role USING (true) WITH CHECK (true);
```
- **Who**: `service_role` (backend services and Edge Functions)
- **What**: `ALL` operations (SELECT, INSERT, UPDATE, DELETE)
- **Why**: Allows Edge Functions to manage contacts when sending to Brevo
- **Security**: ✅ Safe - only your backend services can do everything

## How to Apply These Policies

1. **Go to Supabase SQL Editor:**
   https://supabase.com/dashboard/project/gakgjtaykpflknfmezez/editor

2. **Click "New query"**

3. **Copy and paste the SQL above**

4. **Click "Run"**

5. **Verify policies were created:**
   ```sql
   SELECT policyname, roles, cmd 
   FROM pg_policies 
   WHERE tablename = 'contacts';
   ```
   
   You should see 3 policies:
   - `Allow public contact submissions` → public → INSERT
   - `Allow authenticated users to view contacts` → authenticated → SELECT
   - `Allow service role full access` → service_role → ALL

## Testing After Enabling RLS

### Test 1: Contact Form (Should Work)
Submit your contact form - it should successfully insert a record.

### Test 2: Anonymous Read (Should Fail)
Try to read contacts without logging in:
```javascript
// This should FAIL (403 Forbidden)
const { data } = await supabase.from('contacts').select('*');
```
✅ **Expected**: Access denied - this is secure behavior!

### Test 3: Authenticated Read (Should Work)
Log in to Supabase Dashboard and view the contacts table.
✅ **Expected**: You can see all contacts

### Test 4: Edge Function (Should Work)
Submit form - Edge Function should still work to send to Brevo.
✅ **Expected**: Email sent to Brevo successfully

## Troubleshooting

### "new row violates row level security policy"
- **Issue**: The INSERT policy isn't allowing inserts
- **Fix**: Make sure `TO public` is used (not `TO anon`)
- **Command**: Re-run the policy creation SQL above

### "permission denied for table contacts"
- **Issue**: Missing GRANT permissions
- **Fix**: Run these commands:
  ```sql
  GRANT INSERT ON public.contacts TO anon;
  GRANT INSERT ON public.contacts TO authenticated;
  GRANT USAGE ON SEQUENCE contacts_id_seq TO anon;
  ```

### Form still doesn't work after enabling RLS
- **Check 1**: Verify policies exist: `SELECT * FROM pg_policies WHERE tablename = 'contacts';`
- **Check 2**: Check browser console for specific error messages
- **Check 3**: Temporarily disable RLS to isolate the issue: `ALTER TABLE public.contacts DISABLE ROW LEVEL SECURITY;`

## Security Best Practices

### ✅ DO:
- Keep RLS **ENABLED** in production
- Use `public` role for INSERT policies (allows anonymous form submissions)
- Use `authenticated` role for SELECT policies (protects contact data)
- Use `service_role` for backend operations

### ❌ DON'T:
- Don't disable RLS in production
- Don't use `WITH CHECK (true)` for SELECT policies - use `USING (true)`
- Don't grant ALL permissions to `public` or `anon` roles
- Don't expose sensitive contact data to unauthenticated users

## Current Setup Summary

| Role | Permissions | Use Case |
|------|------------|----------|
| `public` | INSERT only | Contact form submissions |
| `authenticated` | SELECT only | Team viewing contacts |
| `service_role` | ALL | Edge Functions, backend tasks |

## Quick Commands

### Enable RLS:
```sql
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
```

### Disable RLS (testing only):
```sql
ALTER TABLE public.contacts DISABLE ROW LEVEL SECURITY;
```

### View current policies:
```sql
SELECT * FROM pg_policies WHERE tablename = 'contacts';
```

### Drop all policies:
```sql
DROP POLICY IF EXISTS "Allow public contact submissions" ON public.contacts;
DROP POLICY IF EXISTS "Allow authenticated users to view contacts" ON public.contacts;
DROP POLICY IF EXISTS "Allow service role full access" ON public.contacts;
```

---

**After applying secure RLS policies, your contact form will be secure and production-ready!** ✅
