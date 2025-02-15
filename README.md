# AS Lending

A Next.js application for AS Lending platform.

## Development

First, run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment to Vercel

This project is configured for deployment on Vercel. To deploy:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Visit [Vercel](https://vercel.com) and sign in
3. Click "New Project"
4. Import your Git repository
5. Configure your environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"

### Environment Variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

Then update the values in `.env.local` with your actual configuration.

## Features

- Next.js 14 with App Router
- Supabase Integration
- Tailwind CSS for styling
- Dark mode support
- Internationalization ready
- TypeScript
- ESLint configuration
- Responsive design
