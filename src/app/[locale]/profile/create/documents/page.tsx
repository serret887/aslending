import { getTranslations } from 'next-intl/server';
import { ProfileSteps } from '@/components/profile/profile-steps';
import { DocumentUploadForm } from '@/components/profile/document-upload-form';

export default async function DocumentsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('profile');

  return (
    <div className="space-y-8">
      <ProfileSteps
        currentStep="documents"
        t={{
          personalInfo: t('personalInfo'),
          financialInfo: t('financialInfo'),
          documents: t('documents'),
        }}
      />
      <div className="rounded-lg border bg-card p-8">
        <DocumentUploadForm
          t={{
            uploadInstructions: t('uploadInstructions'),
            uploadButton: t('uploadButton'),
            back: t('back'),
            finish: t('finish'),
            uploading: t('uploading'),
            documentTypes: {
              payStubs: t('documentTypes.payStubs'),
              taxReturns: t('documentTypes.taxReturns'),
              bankStatements: t('documentTypes.bankStatements'),
              identification: t('documentTypes.identification'),
            },
          }}
          locale={locale}
        />
      </div>
    </div>
  );
} 