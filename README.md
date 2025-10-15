
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

### Environment Variables
Create a `.env` file in the root with:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
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
