# AS Funding Platform

A modern lending platform built with Next.js, where realtors and clients can register, input data, and receive mortgage qualification estimates.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Authentication & Database)
- next-intl (Internationalization)
- Framer Motion (Animations)
- HeadlessUI (UI Components)

## Features

- 🌐 Bilingual Support (English & Spanish)
- 🔐 User Authentication
- 👤 Profile Creation
- 💰 Mortgage Calculator
- 📱 Responsive Design
- 📝 Blog Section

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Update the `.env.local` file with your Supabase credentials

5. Run the development server:
   ```bash
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Deployment

The application is deployed on Vercel. Each push to the main branch triggers an automatic deployment.

## License

MIT
