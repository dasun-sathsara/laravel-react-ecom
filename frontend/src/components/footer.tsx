import { Container } from './ui/container';
import { ShoppingBag } from 'lucide-react';

const links = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Orders', href: '/orders' },
    { name: 'Checkout', href: '/checkout' },
];

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <Container>
                <div className="flex flex-col items-center py-6 space-y-4">
                    {/* Logo Row */}
                    <div className="flex items-center space-x-2">
                        <ShoppingBag className="h-4 w-4" />
                        <span className="text-base font-semibold">TechStack</span>
                    </div>

                    {/* Navigation Links Row */}
                    <div className="flex items-center space-x-6">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Copyright Row */}
                    <div className="text-xs text-muted-foreground">
                        {new Date().getFullYear()} TechStack. All rights reserved.
                    </div>
                </div>
            </Container>
        </footer>
    );
}
