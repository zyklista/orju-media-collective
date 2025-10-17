# Deploy Contact Form Edge Function to Supabase

Quick guide to deploy the `send-contact-email` Edge Function.

## Prerequisites

- Supabase account with a project created
- Brevo (Sendinblue) account with API key
- Your Brevo marketing list ID

## Step 1: Get Your Supabase Project Reference

1. Go to https://supabase.com/dashboard
2. Open your project
3. Go to Project Settings → General
4. Copy your **Project ID** (looks like: `abcdefghijklmnop`)

## Step 2: Login to Supabase

```bash
npx supabase login
```

This will open a browser window. Authorize the CLI to access your account.

## Step 3: Link Your Project

Replace `YOUR_PROJECT_ID` with your actual project ID:

```bash
npx supabase link --project-ref YOUR_PROJECT_ID
```

Example:
```bash
npx supabase link --project-ref abcdefghijklmnop
```

## Step 4: Set Function Secrets

You need to set two secrets. Get these values first:

### Get BREVO_API_KEY
1. Go to https://app.brevo.com/settings/keys/api
2. Create or copy your API key (starts with `xkeysib-`)

### Get BREVO_API_KEY_LIST_ID
1. Go to https://app.brevo.com/contact/list
2. Click on your marketing list
3. The list ID is in the URL (e.g., `2`, `5`, `10`)

### Set the secrets:

```bash
# Set Brevo API Key
npx supabase secrets set BREVO_API_KEY=xkeysib-your-actual-key-here

# Set Brevo List ID (just the number)
npx supabase secrets set BREVO_API_KEY_LIST_ID=2
```

**Important**: Replace the values with your actual API key and list ID!

## Step 5: Deploy the Function

```bash
npx supabase functions deploy send-contact-email
```

You should see output like:
```
Deploying function send-contact-email...
Deployed function send-contact-email
Function URL: https://YOUR_PROJECT.supabase.co/functions/v1/send-contact-email
```

## Step 6: Verify Deployment

Check that the function is deployed:

```bash
npx supabase functions list
```

You should see `send-contact-email` in the list.

## Step 7: Test the Function

You can test it with curl:

```bash
curl -X POST 'https://YOUR_PROJECT.supabase.co/functions/v1/send-contact-email' \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User",
    "stayInTouch": true
  }'
```

Replace:
- `YOUR_PROJECT` with your project reference
- `YOUR_ANON_KEY` with your anon key from Supabase Dashboard → Project Settings → API

## Step 8: Verify Brevo Configuration

Make sure in your Brevo account:

1. **Verify sender email**: 
   - Go to https://app.brevo.com/settings/company
   - Verify that `noreply@orjumedia.com` is verified as a sender
   - If not, add and verify it

2. **Check API key permissions**:
   - Your API key should have permissions for:
     - ✅ Contacts management
     - ✅ Transactional emails (SMTP)

## Troubleshooting

### "Function not found" error
- Make sure you deployed: `npx supabase functions list`
- Check you're linked to the right project

### "Missing BREVO_API_KEY" error
- Verify secrets are set: `npx supabase secrets list`
- Re-set the secrets if needed

### "Unauthorized" error when testing
- Make sure you're using the correct anon key
- Check Authorization header format: `Bearer YOUR_KEY`

### Brevo errors (400/401)
- Verify your Brevo API key is correct
- Check that `noreply@orjumedia.com` is verified in Brevo
- Verify the list ID exists and is correct

### View Function Logs

Check real-time logs:
```bash
npx supabase functions logs send-contact-email --tail
```

Or view in dashboard:
1. Go to https://supabase.com/dashboard/project/YOUR_PROJECT/functions
2. Click on `send-contact-email`
3. Click "Logs" tab

## What Happens When Form is Submitted

1. ✅ Contact data is saved to your Supabase `contacts` table
2. ✅ Edge Function is called with the contact data
3. ✅ Contact is created/updated in Brevo with all attributes
4. ✅ If user checked "stay in touch", they're added to your marketing list
5. ✅ Notification email is sent to `hello@orjumedia.com`

## Next Steps

After deployment:
1. Test the contact form on your live site
2. Check that contacts appear in Supabase
3. Check that contacts appear in Brevo
4. Verify you receive the notification email
5. For opt-ins, verify they appear in your Brevo list

## Need Help?

- Supabase Functions Docs: https://supabase.com/docs/guides/functions
- Brevo API Docs: https://developers.brevo.com/
- Check function logs for detailed error messages
