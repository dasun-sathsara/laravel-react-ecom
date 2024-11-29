import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useAuthStore } from '@/store/auth-store';

import { Container } from './ui/container';

const baseLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
];

const userLinks = [
    { name: 'Orders', href: '/orders' },
    { name: 'Checkout', href: '/checkout' },
];

const adminLinks = [{ name: 'Dashboard', href: '/admin/dashboard' }];

export function Footer() {
    const { isAuthenticated, isAdmin } = useAuthStore();

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
                        {baseLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                {link.name}
                            </Link>
                        ))}
                        {isAuthenticated &&
                            !isAdmin() &&
                            userLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                    {link.name}
                                </Link>
                            ))}
                        {isAuthenticated &&
                            isAdmin() &&
                            adminLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                    {link.name}
                                </Link>
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
