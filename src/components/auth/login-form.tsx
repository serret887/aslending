'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslations } from "next-intl"
import { useState } from 'react'
import { Link, useRouter } from '@/i18n/routing'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { routes, getLocalizedRoute } from '@/config/routes'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations('auth');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: signInError } = await createClient().auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) {
        throw signInError;
      }

      router.push(getLocalizedRoute(routes.dashboard, locale));
    } catch (err) {
      setError(err instanceof Error ? err.message : t('loginError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full max-w-[1000px] mx-auto", className)} {...props}>
      <Card className="grid md:grid-cols-2 bg-white overflow-hidden">
        <div className="p-10">
          <div className="flex flex-col gap-8">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">{t('welcome')}</h1>
              <p className="text-base text-gray-500">
                {t('loginToAccount')}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="username@example.com"
                  className="h-11 text-base border border-gray-200 rounded-lg"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <Link
                    href="#"
                    className="text-sm text-gray-500 hover:text-[#E31837]"
                  >
                    {t('forgotPassword')}
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-11 text-base border border-gray-200 rounded-lg"
                  required
                  disabled={isLoading}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 text-base bg-black hover:bg-black/90 text-white rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? t('loggingIn') : t('login')}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-4 text-gray-500">
                  {t('orContinueWith')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="h-11 border border-gray-200 rounded-lg hover:bg-gray-50">
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                </svg>
              </Button>
              <Button variant="outline" className="h-11 border border-gray-200 rounded-lg hover:bg-gray-50">
                <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018c0-3.878 3.132-7.018 7-7.018c1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062c-2.31 0-4.187 1.956-4.187 4.273c0 2.315 1.877 4.277 4.187 4.277c2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474c0 4.01-2.677 6.86-6.72 6.86z" fill="currentColor"/>
                </svg>
              </Button>
              <Button variant="outline" className="h-11 border border-gray-200 rounded-lg hover:bg-gray-50">
                <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.8c1.8 0 3.362.92 4.277 2.308-.168.276-1.002 1.724-3.102 2.746-.972-1.786-2.05-3.264-2.214-3.486.376-.058.76-.088 1.039-.088zM9.123 6.964c.158.209 1.2 1.694 2.188 3.438-2.765.824-5.205.826-5.478.826-.002-.056-.004-.11-.004-.166 0-1.366.506-2.618 1.34-3.576.276.322 1.627 1.76 1.954 2.478zm-2.25 4.59c.27.002 2.335.014 4.986-.618.14.27.27.54.392.81l-.193.058c-2.666.858-4.115 3.208-4.288 3.506-1.314-1.45-2.12-3.368-2.12-5.47 0-.17.008-.34.022-.506.38.008 1.97.042 3.78.506-.572.944-1.12 1.888-1.58 2.714zm9.252 6.076c-.182-.098-1.518-.89-3.096-2.702.13-.202.25-.404.366-.608 2.93 1.102 4.136.672 4.136.672s.116 1.798-1.406 2.638zm-2.973-3.898c-2.514 4.41-3.502 4.234-3.502 4.234-.098-.068-2.208-1.312-2.894-3.47 2.694-2.124 3.894-2.832 3.894-2.832.48.692 1.672 1.512 2.502 2.068zm4.598-4.732c-.024.184-.056.366-.094.546-.11.044-1.58.634-4.044.29l-.048-.02c2.54-2.09 2.974-3.91 2.974-3.91.946.982 1.224 2.072 1.212 3.094z" fill="currentColor"/>
                </svg>
              </Button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-500">{t('noAccount')}</span>{" "}
              <Link 
                href={getLocalizedRoute(routes.auth.register, locale)} 
                className="text-sm font-medium text-[#E31837] hover:underline"
              >
                {t('signUp')}
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden md:block bg-gray-50">
          <div className="h-full flex items-center justify-center">
            <svg className="w-32 h-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 48 48">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M24 8v32m16-16H8" />
            </svg>
          </div>
        </div>
      </Card>
      
      <p className="mt-4 text-center text-sm text-gray-500">
        {t('termsNotice')}{" "}
        <Link 
          href={getLocalizedRoute(routes.about, locale)} 
          className="text-[#E31837] hover:underline"
        >
          {t('termsOfService')}
        </Link>{" "}
        {t('and')}{" "}
        <Link 
          href={getLocalizedRoute(routes.about, locale)} 
          className="text-[#E31837] hover:underline"
        >
          {t('privacyPolicy')}
        </Link>
      </p>
    </div>
  )
}
