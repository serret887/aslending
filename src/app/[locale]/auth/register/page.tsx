'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthForm from '@/components/auth/AuthForm';
import { supabase } from '@/lib/supabase';

export default function RegisterPage() {
  const t = useTranslations();
  const router = useRouter();

  const handleRegister = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw error;
    }

    // Redirect to a confirmation page or show a success message
    router.push('/auth/verify-email');
  };

  return (
    <AuthLayout
      title={t('auth.signUp')}
      subtitle={t('auth.hasAccount')}
    >
      <AuthForm type="register" onSubmit={handleRegister} />
    </AuthLayout>
  );
} 