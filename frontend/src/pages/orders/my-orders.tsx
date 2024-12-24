import { format } from 'date-fns';
import { AlertCircle, ClipboardList, Loader2 } from 'lucide-react';
import { useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useOrderStore } from '@/store/order-store';

function OrdersPage() {
    const { toast } = useToast();
    const { orders, isLoading, fetchOrdersError, fetchOrders, clearFetchOrdersError } = useOrderStore();

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    useEffect(() => {
        if (fetchOrdersError) {
            toast({
                title: 'Error',
                description: fetchOrdersError,
                variant: 'destructive',
                duration: 3000,
            });
            clearFetchOrdersError();
        }
    }, [fetchOrdersError, toast, clearFetchOrdersError]);

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'success':
                return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/15';
            case 'pending':
                return 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/15';
            case 'failed':
                return 'bg-red-500/15 text-red-700 dark:text-red-400 hover:bg-red-500/15';
            default:
                return 'bg-gray-500/15 text-gray-700 dark:text-gray-400 hover:bg-gray-500/15';
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[70vh]">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-lg font-medium">Loading orders...</p>
                </div>
            </div>
        );
    }

    if (fetchOrdersError) {
        return (
            <div className="flex flex-col items-center justify-center space-y-6 min-h-[70vh]">
                <div className="text-center space-y-4">
                    <AlertCircle className="h-10 w-10 mx-auto" />
                    <h2 className="text-2xl font-semibold tracking-tight">Error Loading Orders</h2>
                    <p className="text-base text-muted-foreground max-w-md mx-auto">{fetchOrdersError}</p>
                </div>
                <Button variant="outline" onClick={() => fetchOrders()}>
                    Try Again
                </Button>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Order History</h1>
                <p className="text-muted-foreground mt-2">View and track your orders</p>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                    <CardTitle className="flex items-center gap-2">
                        <ClipboardList className="h-5 w-5" />
                        My Orders
                    </CardTitle>
                    <div className="text-sm text-muted-foreground">Total Orders: {orders.length}</div>
                </CardHeader>
                <CardContent>
                    {orders.length === 0 ? (
                        <div className="text-center py-12">
                            <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-lg font-medium mb-2">No Orders Found</p>
                            <p className="text-muted-foreground">Your order history will appear here</p>
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[120px] font-medium">Order ID</TableHead>
                                        <TableHead className="w-[150px] font-medium">Date</TableHead>
                                        <TableHead className="font-medium">Items</TableHead>
                                        <TableHead className="w-[120px] text-right font-medium">Total</TableHead>
                                        <TableHead className="w-[100px] text-center font-medium">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium">{order.id}</TableCell>
                                            <TableCell>{format(new Date(order.date), 'MMM d, yyyy')}</TableCell>
                                            <TableCell>
                                                <div className="space-y-1.5">
                                                    {order.items.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className="text-sm flex items-center gap-1.5">
                                                            <span className="font-medium">{item.quantity}x</span>
                                                            <span className="flex-1">{item.name}</span>
                                                            <span className="text-muted-foreground">
                                                                ${item.price.toFixed(2)}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right font-medium">
                                                ${order.totalPrice.toFixed(2)}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge
                                                    className={`${getStatusBadgeVariant(
                                                        order.status,
                                                    )} select-none border-0`}
                                                    variant="secondary">
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default OrdersPage;
