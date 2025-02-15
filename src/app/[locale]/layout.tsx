import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import Navigation from '@/components/Navigation';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AS Lending',
  description: 'AS Lending',
};

const locales = ['en', 'es'];

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) notFound();

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen antialiased bg-background text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navigation />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 