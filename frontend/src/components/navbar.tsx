import { ShoppingBag, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Container } from './ui/container';
import { Link, useNavigate } from 'react-router-dom';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'Orders', href: '/orders' },
];

export function Navbar() {
    const navigate = useNavigate();

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
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center justify-end gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate('/checkout')} className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                                0
                            </span>
                        </Button>
                        <Button variant="ghost" onClick={() => navigate('/login')}>
                            Sign in
                        </Button>
                        <Button onClick={() => navigate('/signup')}>Sign up</Button>
                    </div>
                </div>
            </Container>
        </header>
    );
}
