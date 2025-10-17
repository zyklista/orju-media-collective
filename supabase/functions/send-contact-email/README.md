# Send Contact Email - Supabase Edge Function

This Edge Function handles contact form submissions by integrating with Brevo (Sendinblue) for email automation and contact management.

## What it does

1. **Creates/Updates Brevo Contact**: Stores all contact information with custom attributes
2. **Manages List Subscriptions**: Automatically adds contacts to your marketing list if they opt-in
3. **Sends Notification Email**: Sends detailed submission info to your team at `hello@orjumedia.com`

## Required Secrets

Set these in Supabase Dashboard or via CLI:

### BREVO_API_KEY
Your Brevo API key from https://app.brevo.com/settings/keys/api

```bash
supabase secrets set BREVO_API_KEY=xkeysib-your-api-key-here
```

### BREVO_API_KEY_LIST_ID
The numeric ID of your Brevo list for marketing contacts. Find this at https://app.brevo.com/contact/list

```bash
supabase secrets set BREVO_API_KEY_LIST_ID=2
```

## Deployment

```bash
# Deploy to Supabase
supabase functions deploy send-contact-email

# Verify it's deployed
supabase functions list
```

## Testing Locally

```bash
# Start the function locally
supabase functions serve send-contact-email

# Test with curl (in another terminal)
curl -X POST http://localhost:54321/functions/v1/send-contact-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "email": "test@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "company": "Test Company",
    "jobTitle": "Manager",
    "region": "USA",
    "category": "General Inquiry",
    "help": "Testing the contact form",
    "budget": "$5,000 - $10,000",
    "hearAbout": "Google",
    "stayInTouch": true
  }'
```

## Request Payload

The function expects a JSON payload with these fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Contact's email address |
| `firstName` | string | No | Contact's first name |
| `lastName` | string | No | Contact's last name |
| `company` | string | No | Company/website |
| `jobTitle` | string | No | Job title |
| `region` | string | No | Geographic region |
| `category` | string | No | Inquiry category |
| `help` | string | No | Message/inquiry details |
| `budget` | string | No | Project budget |
| `hearAbout` | string | No | How they heard about you |
| `stayInTouch` | boolean | No | Opt-in for marketing (default: false) |

## Response

Success (200):
```json
{
  "success": true,
  "contact": { ... },
  "email": { ... },
  "addedToList": true
}
```

Error (400/500):
```json
{
  "error": "Error message"
}
```

## Brevo Integration

### Contact Attributes
The function creates these custom attributes in Brevo:

- `FIRSTNAME`
- `LASTNAME`
- `COMPANY`
- `JOB_TITLE`
- `REGION`
- `CATEGORY`
- `BUDGET`
- `HEAR_ABOUT`
- `STAY_IN_TOUCH` (Yes/No)

Make sure these attributes exist in your Brevo account (Settings -> Contact Attributes) or create them.

### Email Template
The notification email includes all submission details and is sent to:
- **To**: `hello@orjumedia.com`
- **From**: `noreply@orjumedia.com` (must be verified in Brevo)
- **Subject**: "New contact from [Name/Email]"

## Troubleshooting

### Function not found
Make sure it's deployed:
```bash
supabase functions list
```

### Secrets not set
Check secrets are configured:
```bash
supabase secrets list
```

### Brevo API errors
- Verify your API key has permissions for Contacts and SMTP
- Verify `noreply@orjumedia.com` is verified in Brevo
- Check the list ID exists and is valid

### Logs
View function logs in real-time:
```bash
supabase functions logs send-contact-email --tail
```

Or in the Supabase Dashboard:
1. Go to Edge Functions
2. Click on `send-contact-email`
3. Click "Logs" tab

## Security

- API keys are stored securely in Supabase Function Secrets (encrypted at rest)
- Never expose `BREVO_API_KEY` in frontend code
- The function validates all inputs and handles errors gracefully
- Consider adding rate limiting if needed

## Frontend Integration

The contact form (`src/pages/Contact.tsx`) calls this function via:

```typescript
await supabase.functions.invoke('send-contact-email', { 
  body: payload 
});
```

The function is automatically authenticated via the Supabase client's anon key.
