'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import RegisterForm from '@/components/auth/RegisterForm';
import { routes } from '@/config/routes';
import { useParams } from 'next/navigation';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const { locale } = useParams();

  return (
    <>
      <RegisterForm />
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              {t('hasAccount')}
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href={`/${locale}${routes.auth.login}`}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {t('signIn')}
          </Link>
        </div>
      </div>
    </>
  );
} 