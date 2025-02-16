import { getTranslations } from 'next-intl/server';

export default async function ProfileCreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations('profile');

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
            <p className="mt-2 text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
} 