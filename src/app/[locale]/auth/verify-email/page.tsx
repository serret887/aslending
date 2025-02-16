'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { routes } from '@/config/routes';
import { useParams } from 'next/navigation';

export default function VerifyEmailPage() {
  const t = useTranslations('auth');
  const { locale } = useParams();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-muted/50">
      <div className="w-full max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-lg shadow-md px-8 py-12 w-full"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <EnvelopeIcon
              className="h-6 w-6 text-primary"
              aria-hidden="true"
            />
          </div>
          <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground text-center">
            {t('verifyEmail')}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground text-center">
            {t('verifyEmailInstructions')}
          </p>
          <div className="mt-6 text-center">
            <Link
              href={`/${locale}${routes.auth.login}`}
              className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
            >
              {t('backToLogin')}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 