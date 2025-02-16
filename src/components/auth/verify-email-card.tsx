'use client';

import { motion } from 'framer-motion';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { Link } from '@/i18n/routing';
import { routes } from '@/config/routes';

interface VerifyEmailCardProps {
  t: {
    verifyEmail: string;
    verifyEmailInstructions: string;
    backToLogin: string;
  };
  locale: string;
}

export function VerifyEmailCard({ t, locale }: VerifyEmailCardProps) {
  return (
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
        {t.verifyEmail}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground text-center">
        {t.verifyEmailInstructions}
      </p>
      <div className="mt-6 text-center">
        <Link
          href={`/${locale}${routes.auth.login}`}
          className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
        >
          {t.backToLogin}
        </Link>
      </div>
    </motion.div>
  );
} 