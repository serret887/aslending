import { getTranslations } from 'next-intl/server';
import { VerifyEmailCard } from '@/components/auth/verify-email-card';

export default async function VerifyEmailPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('auth');

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-muted/50">
      <div className="w-full max-w-sm">
        <VerifyEmailCard
          t={{
            verifyEmail: t('verifyEmail'),
            verifyEmailInstructions: t('verifyEmailInstructions'),
            backToLogin: t('backToLogin'),
          }}
          locale={locale}
        />
      </div>
    </div>
  );
} 