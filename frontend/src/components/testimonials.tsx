import { Star } from 'lucide-react';

import { Card, CardContent } from './ui/card';
import { Container } from './ui/container';

const testimonials = [
    {
        id: 1,
        content:
            'Excellent tech products with great value for money. Same-day delivery to Colombo was a real lifesaver!',
        author: 'Kumari Perera',
        role: 'Verified Buyer - Colombo 05',
        avatar: 'https://plus.unsplash.com/premium_photo-1726837522060-c119961e1faa?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 2,
        content:
            'Finally found reliable tech shopping in Sri Lanka. Their warranty service at Unity Plaza branch is excellent.',
        author: 'Malik Fernando',
        role: 'Verified Buyer - Nugegoda',
        avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&h=100&q=80',
    },
    {
        id: 3,
        content: 'Best prices for genuine products. Next-day delivery to Kandy was impressive. සතුටුයි!',
        author: 'Dilshani Silva',
        role: 'Verified Buyer - Kandy',
        avatar: 'https://images.unsplash.com/photo-1593351415075-3bac9f45c877?w=100&h=100&q=80',
    },
];

export function Testimonials() {
    return (
        <div className="py-18 sm:py-32 bg-muted/50">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">What Our Customers Say</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Trusted by tech enthusiasts across the island
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.id} className="h-full">
                            <CardContent className="p-6 flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground">{testimonial.content}</p>
                                </div>
                                <div className="flex items-center gap-4 mt-auto pt-6">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.author}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold">{testimonial.author}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Container>
        </div>
    );
}
