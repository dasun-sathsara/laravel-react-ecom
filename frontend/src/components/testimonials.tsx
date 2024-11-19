import { Container } from './ui/container';
import { Card, CardContent } from './ui/card';
import { Star } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        content: 'The best tech gadgets with amazing features. Highly recommend TechStack!',
        author: 'Sarah Johnson',
        role: 'Verified Buyer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80',
    },
    {
        id: 2,
        content: 'TechStack offers a wide range of gadgets that suit all my tech needs.',
        author: 'Michael Chen',
        role: 'Verified Buyer',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&q=80',
    },
    {
        id: 3,
        content: "TechStack's customer service is top-notch. They helped me choose the perfect gadget.",
        author: 'Emily Davis',
        role: 'Verified Buyer',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&q=80',
    },
];

export function Testimonials() {
    return (
        <div className="py-18 sm:py-32 bg-muted/50">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">What Tech Enthusiasts Say</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Don't just take our word for it</p>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.id} className="h-full">
                            <CardContent className="p-6">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground">{testimonial.content}</p>
                                <div className="mt-6 flex items-center gap-4">
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
