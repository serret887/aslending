import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (email: string, password: string) => Promise<void>;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const t = useTranslations();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {t('common.email')}
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {t('common.password')}
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={type === 'login' ? 'current-password' : 'new-password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? t('common.loading') : t(`auth.${type === 'login' ? 'signIn' : 'signUp'}`)}
        </button>
      </div>

      <div className="text-sm text-center">
        {type === 'login' ? (
          <>
            <Link
              href="/auth/forgot-password"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {t('auth.forgotPassword')}
            </Link>
            <div className="mt-2">
              {t('auth.noAccount')}{' '}
              <Link
                href="/auth/register"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                {t('auth.signUp')}
              </Link>
            </div>
          </>
        ) : (
          <div>
            {t('auth.hasAccount')}{' '}
            <Link
              href="/auth/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {t('auth.signIn')}
            </Link>
          </div>
        )}
      </div>
    </motion.form>
  );
} 