'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import RegisterForm from '@/components/auth/RegisterForm';
import { routes, getLocalizedRoute } from '@/config/routes';
import { useParams } from 'next/navigation';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const { locale } = useParams();

  return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-muted/50">
      <div className="w-full max-w-sm md:max-w-3xl">
          <RegisterForm />
       </div>
     </div>
  );
} 