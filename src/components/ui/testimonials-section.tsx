import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader } from './card';
import { StarIcon } from 'lucide-react';

const testimonials = [
  {
    nameKey: 'testimonials.1.name',
    roleKey: 'testimonials.1.role',
    contentKey: 'testimonials.1.content',
    rating: 5,
  },
  {
    nameKey: 'testimonials.2.name',
    roleKey: 'testimonials.2.role',
    contentKey: 'testimonials.2.content',
    rating: 5,
  },
  {
    nameKey: 'testimonials.3.name',
    roleKey: 'testimonials.3.role',
    contentKey: 'testimonials.3.content',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const t = useTranslations('Home');

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{t('testimonials.title')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardHeader>
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <h3 className="text-xl font-semibold">{t(testimonial.nameKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(testimonial.roleKey)}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">"{t(testimonial.contentKey)}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 