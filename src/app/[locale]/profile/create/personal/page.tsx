import { getTranslations } from 'next-intl/server';
import { ProfileSteps } from '@/components/profile/profile-steps';
import { PersonalInfoForm } from '@/components/profile/personal-info-form';

export default async function PersonalInfoPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('profile');

  return (
    <div className="space-y-8">
      <ProfileSteps
        currentStep="personal"
        t={{
          personalInfo: t('personalInfo'),
          financialInfo: t('financialInfo'),
          documents: t('documents'),
        }}
      />
      <div className="rounded-lg border bg-card p-8">
        <PersonalInfoForm
          t={{
            firstName: t('firstName'),
            lastName: t('lastName'),
            phone: t('phone'),
            next: t('next'),
            saving: t('saving'),
          }}
          locale={locale}
        />
      </div>
    </div>
  );
} 