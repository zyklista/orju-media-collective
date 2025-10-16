
# Orju Media Collective Web App


## Project Overview

This is the official website for Orju Media Collective, built with React, Vite, TypeScript, Tailwind CSS, and shadcn-ui. It features:

- Responsive design for all devices
- Dynamic navigation and highlighted Contact button
- Merchandise page with currency selector
- Contact form with validation
- Supabase integration for backend services
- Modern, branded UI with custom favicon

## Getting Started

### Prerequisites
- Node.js & npm (recommended: use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Setup
```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd orju-media-collective

# Install dependencies
npm install

# Set up environment variables (see .env.example)
cp .env.example .env
# Or manually add your Supabase keys to .env

# Start the development server
npm run dev
```

### Running the dev server for external access (outside VS Code/DevContainer)

If you want to access the running dev server from another machine or a browser outside the editor/DevContainer (for example: mobile device on the same LAN or a host browser), start Vite bound to all interfaces and a specific port:

```sh
# Example: bind to 0.0.0.0 and use port 8081
npx vite --host 0.0.0.0 --port 8081
# or via npm script: VITE_HOST=0.0.0.0 VITE_PORT=8081 npm run dev
```

Then open `http://<HOST_IP>:8081` in the external browser (replace `<HOST_IP>` with your machine IP). If you're running in a remote container or cloud VM, ensure port 8081 is forwarded/open in your environment.

### Environment Variables
Create a `.env` file in the root with:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
# Optional but required for Stripe checkout via the Edge Function
# (do NOT commit this file or keys to git). Set this secret in Supabase Edge Function
# settings as STRIPE_SECRET_KEY instead of placing it in the frontend env.
# STRIPE_SECRET_KEY=sk_live_...
```

Notes for testing Stripe locally

- The Supabase Edge Function `create-checkout` must have the `STRIPE_SECRET_KEY` set in the Supabase Dashboard (Edge Functions -> your function -> Settings -> Secrets). The function reads this secret server-side and calls Stripe — do not put this value in your frontend `.env`.
- When calling the function from the frontend during local development, the supabase-js client will include the anon key automatically. If you call the function with curl for testing, include both headers so the runtime accepts it:

```sh
curl -X POST 'https://<your-project>.supabase.co/functions/v1/create-checkout' \
	-H "Content-Type: application/json" \
	-H "apikey: <YOUR_SUPABASE_ANON_KEY>" \
	-H "Authorization: Bearer <YOUR_SUPABASE_ANON_KEY>" \
	-d '{"cart":[{"id":"test","name":"T-Shirt","price":20,"quantity":1}],"currency":"USD","success_url":"http://localhost:8081/?checkout=success","cancel_url":"http://localhost:8081/cart?canceled=true"}'
```

## Project Structure

- `src/pages/` — Main pages (Home, About, Services, Contact, Careers, Merchandise)
- `src/components/` — Shared UI components (Navigation, Footer, UI primitives)
- `src/lib/` — Supabase client and utilities
- `public/` — Static assets (favicon, images)

## Features & Recent Updates

- New: Currency selector on Merchandise page
- New: Contact info and office address in footer (Connect section)
- Improved: Consistent spacing, font sizes, and layout across all pages
- Improved: Contact form with extra spacing and hidden contact info below form
- Updated: Custom favicon and branding
- Removed: All Lovable-related code and references

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase


## Deployment

You can deploy this project to any static hosting provider (Vercel, Netlify, etc.) or your own server. Make sure to set the required environment variables for Supabase in your deployment settings.

---

&copy; {new Date().getFullYear()} ORJU MEDIA. All rights reserved.
