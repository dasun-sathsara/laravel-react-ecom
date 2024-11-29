import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

interface CartItem extends Product {
    quantity: number;
    discountedPrice?: number;
}

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
    category: string;
}

const CheckoutPage = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        // In a real application, fetch cart items from your state management solution
        // This is just mock data for demonstration
        const mockCartItems: CartItem[] = [
            {
                id: '1',
                name: 'Premium Headphones',
                description: 'High-quality wireless headphones',
                price: 299.99,
                imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
                stock: 10,
                category: 'Electronics',
                quantity: 1,
                discountedPrice: 269.99,
            },
            {
                id: '2',
                name: 'Smart Watch Pro',
                description: 'Advanced fitness tracking smartwatch',
                price: 199.99,
                imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
                stock: 15,
                category: 'Electronics',
                quantity: 1,
                discountedPrice: 179.99,
            },
            {
                id: '3',
                name: 'Leather Backpack',
                description: 'Stylish and durable leather backpack',
                price: 89.99,
                imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
                stock: 8,
                category: 'Accessories',
                quantity: 2,
            },
        ];

        setCartItems(mockCartItems);
    }, []);

    useEffect(() => {
        calculateTotals();
    }, [cartItems]);

    const calculateTotals = () => {
        const sub = cartItems.reduce((acc, item) => {
            return acc + (item.discountedPrice || item.price) * item.quantity;
        }, 0);

        const disc = cartItems.reduce((acc, item) => {
            return acc + (item.price - (item.discountedPrice || item.price)) * item.quantity;
        }, 0);

        setSubtotal(sub);
        setDiscount(disc);
        setTotal(sub);
    };

    const removeItem = (itemId: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== itemId));
        toast({
            title: 'Item removed',
            description: 'The item has been removed from your cart.',
        });
    };

    const handleCheckout = () => {
        // Implement checkout logic here
        toast({
            title: 'Order placed successfully!',
            description: 'Thank you for your purchase.',
        });
        // Navigate to order confirmation page
        navigate('/order-confirmation');
    };

    return (
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Shopping Cart</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cartItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        className="w-14 h-14 object-cover rounded ring-1 ring-gray-200"
                                                    />
                                                    <div>
                                                        <p className="font-medium">{item.name}</p>
                                                        {item.discountedPrice && (
                                                            <p className="text-sm text-muted-foreground line-through">
                                                                ${item.price.toFixed(2)}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>${(item.discountedPrice || item.price).toFixed(2)}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <span className="px-4">{item.quantity}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                ${((item.discountedPrice || item.price) * item.quantity).toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount</span>
                                        <span>-${discount.toFixed(2)}</span>
                                    </div>
                                )}
                                <Separator />
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full"
                                size="lg"
                                onClick={handleCheckout}
                                disabled={cartItems.length === 0}>
                                Proceed to Payment
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
