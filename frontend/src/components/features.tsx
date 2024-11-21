import { Container } from './ui/container';
import { Clock, Package, RefreshCw, Truck } from 'lucide-react';

const features = [
    {
        name: 'Island-wide Delivery',
        description:
            'Free shipping on orders over Rs. 15,000. Same-day delivery within Colombo and next-day to major cities.',
        icon: Truck,
    },
    {
        name: 'Easy Returns',
        description: 'Shop with confidence with our 14-day hassle-free return policy, available across Sri Lanka.',
        icon: RefreshCw,
    },
    {
        name: 'Genuine Products',
        description: 'All products come with local warranty and are sourced from authorized distributors in Sri Lanka.',
        icon: Package,
    },
    {
        name: '24/7 Support',
        description: 'Our dedicated support team in Colombo is available in Sinhala, Tamil, and English.',
        icon: Clock,
    },
];

export function Features() {
    return (
        <div className="py-20 sm:py-32 bg-gradient-to-b from-background to-muted/50">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why Choose TechStack?</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We're committed to providing the best shopping experience
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <div
                            key={feature.name}
                            className="relative rounded-2xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-md">
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                <feature.icon className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold">{feature.name}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
