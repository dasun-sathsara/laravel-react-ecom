import { format } from 'date-fns';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  date: Date;
  items: OrderItem[];
  totalPrice: number;
  status: 'success' | 'pending' | 'failed';
}

function OrdersPage() {
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: new Date(),
      items: [
        { id: '1', name: 'Product 1', quantity: 2, price: 29.99 },
        { id: '2', name: 'Product 2', quantity: 1, price: 49.99 },
      ],
      totalPrice: 109.97,
      status: 'success',
    },
    // Add more mock orders as needed
  ]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Order Number</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Items</TableHead>
                  <TableHead className="font-semibold text-right">Total Price</TableHead>
                  <TableHead className="font-semibold text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell>{format(order.date, 'PPP')}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {order.items.map((item) => (
                          <div key={item.id} className="text-sm">
                            {item.quantity}x {item.name} (${item.price.toFixed(2)})
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      ${order.totalPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={`${getStatusColor(
                          order.status
                        )} text-white capitalize`}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrdersPage;
