# Careers Page - Brevo Integration Setup

## Overview

All career application buttons on the Careers page are now connected to Brevo! When users click "Apply Now" or "Get In Touch", they see a professional application modal that:

✅ Collects applicant information (name, email, phone, LinkedIn, portfolio, resume, cover letter)
✅ Saves the application to Supabase `career_applications` table
✅ Creates/updates the contact in Brevo with application details
✅ Adds contact to your Brevo Careers list (if they opt in for updates)
✅ Sends a notification email to hello@orjumedia.com with all application details

---

## What Was Built

### 1. **CareerApplicationModal Component** (`src/components/CareerApplicationModal.tsx`)
- Professional modal form for job applications
- Fields: First Name, Last Name, Email, Phone, LinkedIn, Portfolio, Resume URL, Cover Letter
- Option to opt-in for future opportunities
- Real-time validation and error handling
- Success confirmation message

### 2. **Edge Function** (`supabase/functions/submit-career-application/index.ts`)
- Receives application data from the modal
- Creates/updates contact in Brevo with custom attributes:
  - POSITION_APPLIED
  - DEPARTMENT
  - LINKEDIN
  - PORTFOLIO
  - COVER_LETTER (first 500 chars)
  - RESUME_URL
  - APPLICATION_DATE
- Adds contact to Brevo Careers list (configurable)
- Sends beautifully formatted HTML email notification to HR team

### 3. **Database Table** (`supabase/career-applications-schema.sql`)
- Stores all applications with full details
- Includes application status tracking (pending, reviewing, interviewed, rejected, hired)
- Indexes for performance
- View for HR summaries

### 4. **Updated Careers Page** (`src/pages/Careers.tsx`)
- All "Apply Now" buttons trigger the modal with the specific position
- "Get In Touch" button opens modal for general applications
- No more redirects - everything happens on the same page!

---

## Setup Instructions

### Step 1: Create the Database Table

1. Open Supabase SQL Editor:
   ```
   https://supabase.com/dashboard/project/gakgjtaykpflknfmezez/sql/new
   ```

2. Copy the entire contents of `supabase/career-applications-schema.sql`

3. Paste and **Run** in the SQL editor

4. Verify: You should see the table created successfully

### Step 2: Create Brevo Careers List (If Not Already Created)

1. Go to **Brevo Dashboard** → **Contacts** → **Lists**
   ```
   https://app.brevo.com/contact/list
   ```

2. Click **Create a List**

3. Name it: `Careers - Job Applicants` or similar

4. Note the **List ID** (you'll need it in Step 3)

### Step 3: Set Brevo Careers List ID Secret

Choose **ONE** method:

#### Method A: Using Terminal (if you have Supabase CLI)
```bash
supabase secrets set BREVO_CAREERS_LIST_ID=YOUR_LIST_ID --project-ref gakgjtaykpflknfmezez
```
Replace `YOUR_LIST_ID` with the actual Brevo list ID from Step 2.

#### Method B: Using Supabase Dashboard
1. Go to: https://supabase.com/dashboard/project/gakgjtaykpflknfmezez/settings/functions
2. Scroll to **Secrets**
3. Click **Add Secret**
4. Name: `BREVO_CAREERS_LIST_ID`
5. Value: Your Brevo list ID from Step 2
6. Save

**Note:** The `BREVO_API_KEY` secret is already configured and will be reused.

### Step 4: Deploy the Edge Function

Run this command in your terminal:

```bash
cd /workspaces/orju-media-collective
supabase functions deploy submit-career-application --project-ref gakgjtaykpflknfmezez
```

**Expected Output:**
```
Deploying function submit-career-application...
✓ Function deployed successfully
```

### Step 5: Verify Deployment

1. **Local Testing:**
   - Run `npm run dev`
   - Visit http://localhost:8080/careers
   - Click any "Apply Now" button
   - Fill out the form and submit
   - Check browser console (F12) for success logs

2. **Check Supabase Database:**
   - Go to: https://supabase.com/dashboard/project/gakgjtaykpflknfmezez/editor
   - Select `career_applications` table
   - You should see your test application

3. **Check Brevo:**
   - Go to: https://app.brevo.com/contact
   - Search for the email you used in the test
   - Verify contact has all the custom attributes
   - Check if contact was added to your Careers list

4. **Check Email:**
   - Check `hello@orjumedia.com` inbox
   - You should have received a notification email with application details

---

## Brevo Custom Attributes

The Edge Function creates/updates these custom attributes for each contact:

| Attribute Name | Description | Example |
|---------------|-------------|---------|
| `FIRSTNAME` | First name | John |
| `LASTNAME` | Last name | Doe |
| `SMS` | Phone number | +1 555 000 0000 |
| `POSITION_APPLIED` | Job position | Full-stack Web Developer |
| `DEPARTMENT` | Department | Engineering |
| `LINKEDIN` | LinkedIn profile URL | https://linkedin.com/in/johndoe |
| `PORTFOLIO` | Portfolio/website URL | https://johndoe.com |
| `COVER_LETTER` | First 500 chars of cover letter | I am excited to apply... |
| `RESUME_URL` | Link to resume | https://drive.google.com/... |
| `APPLICATION_DATE` | Date applied | 2025-10-22 |

**Make sure these attributes exist in your Brevo account:**
1. Go to: https://app.brevo.com/settings/contact-attributes
2. Add any missing attributes as **Text** type

---

## Testing the Integration

### Test Scenario 1: Apply for Specific Position
1. Go to `/careers` page
2. Click "Apply Now" on any job listing
3. Fill out the form (use real email you can check)
4. Check "I'd like to receive updates" ✓
5. Submit
6. **Expected Results:**
   - Success message appears
   - Application in Supabase database
   - Contact created in Brevo with all attributes
   - Contact added to Careers list
   - Email received at hello@orjumedia.com

### Test Scenario 2: General Application
1. Scroll to bottom of `/careers` page
2. Click "Get In Touch" button
3. Fill out form (position will be "General Application")
4. Submit
5. **Expected Results:**
   - Same as above, but position = "General Application"

### Test Scenario 3: Error Handling
1. Try submitting without required fields (should show validation)
2. Try with invalid email format (should reject)
3. Check browser console for detailed logs

---

## Troubleshooting

### Issue: "Configuration error" in modal

**Cause:** Environment variables not set

**Fix:**
- Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are in `.env` (local) or Vercel env vars (production)

### Issue: Application saves to database but no email received

**Cause:** Edge Function failed

**Fix:**
1. Check Edge Function logs:
   ```bash
   supabase functions logs submit-career-application --project-ref gakgjtaykpflknfmezez
   ```
2. Verify `BREVO_API_KEY` secret is set correctly
3. Check Brevo API key permissions (needs contacts + email permissions)

### Issue: Contact not added to Brevo list

**Cause:** List ID not configured or incorrect

**Fix:**
1. Verify `BREVO_CAREERS_LIST_ID` secret is set
2. Verify the list ID is correct in Brevo dashboard
3. Check that user checked the "receive updates" checkbox

### Issue: Modal not opening when clicking buttons

**Cause:** JavaScript error or React state issue

**Fix:**
1. Check browser console for errors
2. Ensure all imports are correct
3. Refresh the page and try again

---

## Monitoring & Analytics

### View Applications in Supabase
```sql
-- All applications
SELECT * FROM career_applications ORDER BY created_at DESC;

-- Applications by position
SELECT position, COUNT(*) as total 
FROM career_applications 
GROUP BY position;

-- Recent applications (last 7 days)
SELECT * FROM career_applications 
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Applications summary view
SELECT * FROM career_applications_summary;
```

### View Contacts in Brevo
1. Go to: https://app.brevo.com/contact/list
2. Select your Careers list
3. Filter by attributes (e.g., POSITION_APPLIED)

---

## Next Steps

1. **Customize Email Template:**
   - Edit `supabase/functions/submit-career-application/index.ts`
   - Update the `htmlContent` section with your branding

2. **Add File Upload:**
   - Currently uses URLs for resumes
   - Can add Supabase Storage integration for direct file uploads

3. **Automated Email Responses:**
   - Set up Brevo automation to send confirmation emails to applicants
   - Create email templates for different application statuses

4. **Application Status Updates:**
   - Build an admin panel to update `application_status` field
   - Trigger automated emails when status changes

5. **Analytics Dashboard:**
   - Track conversion rates (page views → applications)
   - Monitor time-to-hire by position
   - Analyze source of best candidates

---

## Summary

✅ All career application buttons are now connected to Brevo
✅ Professional application modal with full validation
✅ Data stored in Supabase for your records
✅ Contacts automatically synced to Brevo with all details
✅ Email notifications to your HR team
✅ Optional opt-in for future opportunities

**Everything is ready to deploy to Vercel!** The code is already pushed to GitHub and will auto-deploy. Just complete the setup steps above (database + secrets) and you're live! 🚀
