#!/bin/bash
# Quick deployment script for send-contact-email Edge Function
# Make sure to set your own values below!

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}======================================${NC}"
echo -e "${YELLOW}Supabase Edge Function Deployment${NC}"
echo -e "${YELLOW}======================================${NC}"
echo ""

# Check if npx is available
if ! command -v npx &> /dev/null; then
    echo -e "${RED}Error: npx is not installed. Please install Node.js and npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npx is available${NC}"
echo ""

# Step 1: Login (if not already logged in)
echo -e "${YELLOW}Step 1: Login to Supabase${NC}"
echo "Running: npx supabase login"
npx supabase login

# Step 2: Link project
echo ""
echo -e "${YELLOW}Step 2: Link to your Supabase project${NC}"
echo "Please enter your Supabase Project ID (from Project Settings → General):"
read -p "Project ID: " PROJECT_ID

if [ -z "$PROJECT_ID" ]; then
    echo -e "${RED}Error: Project ID is required${NC}"
    exit 1
fi

npx supabase link --project-ref "$PROJECT_ID"

# Step 3: Set secrets
echo ""
echo -e "${YELLOW}Step 3: Set function secrets${NC}"
echo ""
echo "Get your Brevo API key from: https://app.brevo.com/settings/keys/api"
read -p "Enter your BREVO_API_KEY (starts with xkeysib-): " BREVO_KEY

if [ -z "$BREVO_KEY" ]; then
    echo -e "${RED}Error: Brevo API key is required${NC}"
    exit 1
fi

echo ""
echo "Get your Brevo List ID from: https://app.brevo.com/contact/list"
echo "(It's the number in the URL when viewing your list)"
read -p "Enter your BREVO_API_KEY_LIST_ID (just the number): " BREVO_LIST_ID

if [ -z "$BREVO_LIST_ID" ]; then
    echo -e "${RED}Error: Brevo List ID is required${NC}"
    exit 1
fi

echo ""
echo "Setting secrets..."
npx supabase secrets set BREVO_API_KEY="$BREVO_KEY"
npx supabase secrets set BREVO_API_KEY_LIST_ID="$BREVO_LIST_ID"

# Step 4: Deploy function
echo ""
echo -e "${YELLOW}Step 4: Deploy the Edge Function${NC}"
npx supabase functions deploy send-contact-email

# Step 5: Verify
echo ""
echo -e "${YELLOW}Step 5: Verify deployment${NC}"
npx supabase functions list

echo ""
echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}Deployment Complete!${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Verify noreply@orjumedia.com is verified in Brevo"
echo "2. Test your contact form on the live site"
echo "3. Check Supabase logs: npx supabase functions logs send-contact-email --tail"
echo "4. Verify contacts appear in Brevo"
echo ""
