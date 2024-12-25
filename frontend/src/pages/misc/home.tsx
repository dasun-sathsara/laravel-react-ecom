import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FeaturedProducts } from '@/components/featured-products';
import { Features } from '@/components/features';
import { Hero } from '@/components/hero';
import { Testimonials } from '@/components/testimonials';

export function HomePage() {
    const featuredRef = useRef(null);
    const featuresRef = useRef(null);
    const testimonialsRef = useRef(null);

    const isFeaturedInView = useInView(featuredRef, { once: true, amount: 0.3 });
    const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });
    const isTestimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Hero />
            
            <motion.div
                ref={featuredRef}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isFeaturedInView ? 1 : 0, y: isFeaturedInView ? 0 : 50 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <FeaturedProducts />
            </motion.div>

            <motion.div
                ref={featuresRef}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isFeaturesInView ? 1 : 0, y: isFeaturesInView ? 0 : 50 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <Features />
            </motion.div>

            <motion.div
                ref={testimonialsRef}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isTestimonialsInView ? 1 : 0, y: isTestimonialsInView ? 0 : 50 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <Testimonials />
            </motion.div>
        </motion.div>
    );
}
