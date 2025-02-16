import { getTranslations } from 'next-intl/server';
import { ProfileSteps } from '@/components/profile/profile-steps';
import { FinancialInfoForm } from '@/components/profile/financial-info-form';

export default async function FinancialInfoPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('profile');

  return (
    <div className="space-y-8">
      <ProfileSteps
        currentStep="financial"
        t={{
          personalInfo: t('personalInfo'),
          financialInfo: t('financialInfo'),
          documents: t('documents'),
        }}
      />
      <div className="rounded-lg border bg-card p-8">
        <FinancialInfoForm
          t={{
            annualIncome: t('annualIncome'),
            employmentStatus: t('employmentStatus'),
            employerName: t('employerName'),
            employmentLength: t('employmentLength'),
            creditScore: t('creditScore'),
            monthlyDebt: t('monthlyDebt'),
            next: t('next'),
            saving: t('saving'),
            back: t('back'),
            employed: t('employed'),
            selfEmployed: t('selfEmployed'),
            unemployed: t('unemployed'),
            retired: t('retired'),
          }}
          locale={locale}
        />
      </div>
    </div>
  );
} 