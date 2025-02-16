import { HeroSection } from '@/components/ui/hero-section';
import { FeaturesSection } from '@/components/ui/features-section';
import { TestimonialsSection } from '@/components/ui/testimonials-section';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
    </main>
  );
}