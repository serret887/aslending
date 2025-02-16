import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader } from './card';
import { HomeIcon, CalculatorIcon, ClockIcon } from 'lucide-react';

const features = [
  {
    icon: HomeIcon,
    titleKey: 'features.purchase.title',
    descriptionKey: 'features.purchase.description',
  },
  {
    icon: CalculatorIcon,
    titleKey: 'features.refinance.title',
    descriptionKey: 'features.refinance.description',
  },
  {
    icon: ClockIcon,
    titleKey: 'features.process.title',
    descriptionKey: 'features.process.description',
  },
];

export function FeaturesSection() {
  const t = useTranslations('Home');

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{t('features.title')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white">
              <CardHeader>
                <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{t(feature.titleKey)}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t(feature.descriptionKey)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 