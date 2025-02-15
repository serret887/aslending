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
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
            <EnvelopeIcon
              className="h-6 w-6 text-indigo-600"
              aria-hidden="true"
            />
          </div>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
            {t('verifyEmail')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('verifyEmailInstructions')}
          </p>
          <div className="mt-6">
            <Link
              href={`/${locale}${routes.auth.login}`}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              {t('backToLogin')}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 