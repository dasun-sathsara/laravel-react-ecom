import { Loader2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useCartStore } from '@/store/cart-store';
import { useOrderStore } from '@/store/order-store';
import type { OrderCreate } from '@/types/order';

const CheckoutPage = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { items, totalPrice, totalDiscount, removeItem, removeItemError, fetchCart, reset } = useCartStore();
    const { createOrder, createOrderError } = useOrderStore();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    useEffect(() => {
        if (removeItemError) {
            toast({
                title: 'Error',
                description: removeItemError,
                variant: 'destructive',
                duration: 3000,
            });
        }
    }, [removeItemError, toast]);

    const handleRemoveItem = async (itemId: string) => {
        await removeItem(itemId);
        if (!removeItemError) {
            toast({
                title: 'Success',
                description: 'Item removed from cart',
                duration: 3000,
            });
        }
    };

    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            const orderData: OrderCreate = {
                items: items.map((product) => ({
                    id: product.id,
                    quantity: product.quantity,
                })),
                status: 'pending',
            };

            await createOrder(orderData);

            if (!createOrderError) {
                // Reset the cart after successful order
                reset();

                toast({
                    title: 'Order placed successfully!',
                    description: 'Thank you for your purchase.',
                    duration: 3000,
                });
                navigate('/orders/success');
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
            toast({
                title: 'Error',
                description: 'Failed to process your order',
                variant: 'destructive',
                duration: 3000,
            });
            navigate('/orders/failure');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="text-lg font-medium">Processing your payment...</p>
                    </div>
                </div>
            )}
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
                                        {items.map((item) => (
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
                                                            {item.discountedPrice &&
                                                                item.discountedPrice < item.price && (
                                                                    <p className="text-sm text-muted-foreground line-through">
                                                                        ${item.price.toFixed(2)}
                                                                    </p>
                                                                )}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    ${(item.discountedPrice || item.price).toFixed(2)}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <span className="px-4">{item.quantity}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    ${((item.discountedPrice || item.price) * item.quantity).toFixed(2)}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleRemoveItem(item.id)}>
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
                                        <span>${(totalPrice + totalDiscount).toFixed(2)}</span>
                                    </div>
                                    {totalDiscount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount</span>
                                            <span>-${totalDiscount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <Separator />
                                    <div className="flex justify-between font-bold">
                                        <span>Total</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    size="lg"
                                    onClick={handleCheckout}
                                    disabled={items.length === 0 || isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Proceed to Payment
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckoutPage;
