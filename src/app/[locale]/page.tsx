import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { routes, getLocalizedRoute } from '@/config/routes';
import { useParams } from 'next/navigation';

export default function HomePage() {
  const t = useTranslations('Home');
  const tCommon = useTranslations('common');
  const { locale } = useParams();

  return (
    <div className="relative isolate">
      {/* Hero Content */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('subtitle')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={getLocalizedRoute(routes.auth.register, locale as string)}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {tCommon('register')}
            </Link>
            <Link
              href={getLocalizedRoute(routes.auth.login, locale as string)}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
            >
              {tCommon('login')} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 