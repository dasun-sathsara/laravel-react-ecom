import { Container } from './ui/container';
import { ShoppingBag } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Link } from 'react-router-dom';

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
                        {isAuthenticated && !isAdmin() && (
                            <>
                                <Link
                                    to="/orders"
                                    className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                    Orders
                                </Link>
                                <Link
                                    to="/checkout"
                                    className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                    Checkout
                                </Link>
                            </>
                        )}
                        {isAuthenticated && isAdmin() && (
                            <Link
                                to="/admin/dashboard"
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                Dashboard
                            </Link>
                        )}
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
