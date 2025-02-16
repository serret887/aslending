'use client';

import * as React from 'react';
import { useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { Upload } from 'lucide-react';
import { routes, getLocalizedRoute } from '@/config/routes';

interface DocumentUploadFormProps {
  t: {
    uploadInstructions: string;
    uploadButton: string;
    back: string;
    finish: string;
    uploading: string;
    documentTypes: {
      [key: string]: string;
    };
  };
  locale: string;
}

export function DocumentUploadForm({ t, locale }: DocumentUploadFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploadedFiles(Array.from(files));
    }
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Upload files to Supabase storage
      router.push(getLocalizedRoute(routes.dashboard, locale));
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {t.uploadInstructions}
        </p>
        <div className="grid gap-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  {t.uploadButton}
                </p>
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
            </label>
          </div>
          {uploadedFiles.length > 0 && (
            <ul className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 bg-muted rounded-lg"
                >
                  <span className="text-sm truncate">{file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setUploadedFiles(files => files.filter((_, i) => i !== index));
                    }}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => router.push(getLocalizedRoute(routes.profile.create.financial, locale))}
        >
          {t.back}
        </Button>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || uploadedFiles.length === 0}
        >
          {isLoading ? t.uploading : t.finish}
        </Button>
      </div>
    </form>
  );
} 