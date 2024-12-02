import { ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/auth-store';

import { CheckoutButton } from './checkout-button';
import { Button } from './ui/button';
import { Container } from './ui/container';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
];

const authenticatedNavigation = [...navigation, { name: 'Orders', href: '/orders' }];

export function Navbar() {
    const navigate = useNavigate();
    const { toast } = useToast();

    const { isAuthenticated, logout, isAdmin } = useAuthStore();

    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            navigate('/', { replace: true });
            toast({
                title: 'Success',
                description: 'You have been logged out successfully',
                duration: 3000,
            });
        } else {
            toast({
                title: 'Error',
                description: 'An error occurred while logging out',
                duration: 3000,
            });
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Container>
                <div className="grid grid-cols-3 w-full h-16 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <ShoppingBag className="h-8 w-8" />
                            <span className="ml-2 text-xl font-bold">TechStack</span>
                        </Link>
                    </div>

                    <nav className="flex items-center justify-center gap-6">
                        {(isAuthenticated && !isAdmin() ? authenticatedNavigation : navigation).map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="text-sm font-medium transition-colors hover:text-primary">
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center justify-end gap-4">
                        {isAuthenticated ? (
                            <>
                                <Button variant="ghost" onClick={handleLogout}>
                                    Logout
                                </Button>

                                {isAdmin() ? (
                                    <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
                                ) : (
                                    <CheckoutButton />
                                )}
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" onClick={() => navigate('/login')}>
                                    Sign in
                                </Button>
                                <Button onClick={() => navigate('/signup')}>Sign up</Button>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </header>
    );
}
