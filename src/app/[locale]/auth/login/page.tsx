'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthForm from '@/components/auth/AuthForm';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const t = useTranslations();
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <AuthLayout
      title={t('auth.signIn')}
      subtitle={t('auth.noAccount')}
    >
      <AuthForm type="login" onSubmit={handleLogin} />
    </AuthLayout>
  );
} 