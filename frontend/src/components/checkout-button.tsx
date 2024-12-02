import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useCartStore } from '@/store/cart-store';

import { Button } from './ui/button';

export function CheckoutButton() {
    const navigate = useNavigate();

    const { totalItems: stock } = useCartStore();

    return (
        <>
            <Button variant="ghost" size="icon" onClick={() => navigate('/checkout')} className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[11px] font-medium text-primary-foreground flex items-center justify-center">
                    {stock > 9 ? '9+' : stock}
                </span>
            </Button>
        </>
    );
}
