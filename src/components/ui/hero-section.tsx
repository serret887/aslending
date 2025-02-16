import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader } from './card';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';

export function HeroSection() {
  const t = useTranslations('Home');

  return (
    <section className="relative h-[600px] bg-gradient-to-r from-primary to-primary-foreground">
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">{t('hero.title')}</h1>
            <p className="text-xl mb-6">{t('hero.subtitle')}</p>
          </div>
          
          <Card className="w-full max-w-md mx-auto bg-white">
            <CardHeader>
              <h2 className="text-2xl font-semibold">{t('calculator.title')}</h2>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="homePrice">{t('calculator.homePrice')}</Label>
                  <Input 
                    id="homePrice" 
                    type="number" 
                    placeholder="$250,000"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="downPayment">{t('calculator.downPayment')}</Label>
                  <Input 
                    id="downPayment" 
                    type="number" 
                    placeholder="20%"
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full">
                  {t('calculator.calculate')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 