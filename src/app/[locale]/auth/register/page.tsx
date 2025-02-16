import { getTranslations } from 'next-intl/server';
import RegisterForm from '@/components/auth/register-form';

export default async function RegisterPage() {
  const t = await getTranslations('auth');

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-muted/50">
      <div className="w-full max-w-sm md:max-w-3xl">
        <RegisterForm />
      </div>
    </div>
  );
} 