# Brevo Custom Attributes Setup

## Required Custom Attributes

To properly receive career application data in Brevo, you need to create these custom attributes in your Brevo account:

### Go to Brevo Contact Attributes
https://app.brevo.com/settings/contact-attributes

### Click "Create an Attribute" for each of these:

| Attribute Name | Type | Description | Example Value |
|----------------|------|-------------|---------------|
| `POSITION_APPLIED` | Text | Job position the candidate applied for | "Full-stack Web Developer" |
| `DEPARTMENT` | Text | Department of the position | "Engineering" |
| `LINKEDIN` | Text | LinkedIn profile URL | "https://linkedin.com/in/johndoe" |
| `PORTFOLIO` | Text | Portfolio or personal website URL | "https://johndoe.com" |
| `COVER_LETTER` | Text | First 500 characters of cover letter | "I am excited to apply..." |
| `RESUME_URL` | Text | Link to resume file | "https://drive.google.com/file/..." |
| `APPLICATION_DATE` | Date | Date the application was submitted | "2025-10-22" |

### Attributes Already Exist (Default Brevo Attributes)
- `FIRSTNAME` - Already exists
- `LASTNAME` - Already exists  
- `SMS` - Already exists (for phone number)

## Setup Instructions

1. **Log into Brevo:** https://app.brevo.com

2. **Navigate to Contact Attributes:**
   Settings → Contact Attributes
   Or direct link: https://app.brevo.com/settings/contact-attributes

3. **For each attribute above:**
   - Click "+ Create an attribute"
   - **Category:** Normal
   - **Type:** Text (or Date for APPLICATION_DATE)
   - **Name:** Use exact name from table above (e.g., `POSITION_APPLIED`)
   - Click "Create attribute"

4. **Verify:** After creating all attributes, you should see them listed in your attributes page.

## Why These Attributes?

These attributes allow you to:
- ✅ Segment contacts by position applied for
- ✅ Track which department has most applications
- ✅ Quick access to candidate LinkedIn and portfolio
- ✅ See cover letter preview in Brevo
- ✅ Direct link to full resume
- ✅ Filter by application date

## Using Attributes in Brevo

### Create Segments
Example: All applicants for "Full-stack Web Developer" position
- Filter: `POSITION_APPLIED = "Full-stack Web Developer"`

### Email Campaigns
Send personalized emails to applicants:
```
Hi {{ contact.FIRSTNAME }},

Thank you for applying for the {{ contact.POSITION_APPLIED }} position...
```

### Automation
Set up automation workflows based on:
- Position applied for
- Department
- Application date
- Whether they have a resume uploaded

## Quick Check

After setting up, you can verify by:
1. Going to any contact in Brevo
2. Click "Edit contact"
3. Scroll down - you should see all the new custom fields

---

**Note:** If you skip this step, the Edge Function will still work, but the data won't be stored as attributes in Brevo. The email notifications will still be sent!
