import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from './ui/button';

interface CheckoutButtonProps {
    stock: number;
}

export function CheckoutButton({ stock }: CheckoutButtonProps) {
    const navigate = useNavigate();

    return (
        <>
            <Button variant="ghost" size="icon" onClick={() => navigate('/checkout')} className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                    {stock}
                </span>
            </Button>
        </>
    );
}
