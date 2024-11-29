import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from './ui/button';
import { Container } from './ui/container';

export function Hero() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-[100vh] py-32 sm:py-40 flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-muted/30 to-background" />
            <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
            <div className="absolute inset-0 pointer-events-none">
                {[
                    { top: '15%', left: '10%', size: '25rem' },
                    { top: '50%', left: '50%', size: '30rem' },
                    { top: '20%', left: '70%', size: '28rem' },
                ].map((config, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full mix-blend-normal"
                        style={{
                            background: `radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)`,
                            width: config.size,
                            height: config.size,
                            left: config.left,
                            top: config.top,
                        }}
                    />
                ))}
            </div>

            <Container className="relative">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm">
                        <Sparkles className="h-4 w-4" />
                        <span>Explore the Latest Tech Gadgets</span>
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight sm:text-7xl animate-fade-up">
                        Discover Cutting-Edge Technology
                    </h1>
                    <p className="mt-8 text-lg sm:text-xl leading-8 text-muted-foreground max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
                        Dive into the world of tech gadgets and innovation. Get exclusive deals on the latest tech.
                    </p>

                    <div className="mt-12 flex items-center justify-center animate-fade-up [animation-delay:800ms]">
                        <Button
                            size="lg"
                            className="h-12 px-8 text-base transition-transform hover:scale-105 hover:shadow-lg"
                            onClick={() => navigate('/shop')}
                        >
                            Shop Now
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}
