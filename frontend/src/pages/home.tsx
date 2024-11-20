import { FeaturedProducts } from '@/components/featured-products';
import { Features } from '@/components/features';
import { Hero } from '@/components/hero';
import { Testimonials } from '@/components/testimonials';

export function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Features />
      <Testimonials />
    </>
  );
}
