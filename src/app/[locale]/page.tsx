import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
 
export default function HomePage() {
  const t = useTranslations('Home');
  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href="/about">{t('title')}</Link>
    </div>
  );
}