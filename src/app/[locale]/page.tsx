import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {routes} from '@/config/routes';

export default function HomePage() {
  const t = useTranslations('Home');
  const commonT = useTranslations('common');
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-4xl font-bold text-center">{t('title')}</h1>
      
      <div className="flex gap-4">
        <Link 
          href={routes.auth.login}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {commonT('login')}
        </Link>
        
        <Link 
          href={routes.auth.register}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {commonT('register')}
        </Link>
      </div>
    </div>
  );
}