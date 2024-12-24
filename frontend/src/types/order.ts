interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    id: string;
    date: string;
    items: OrderItem[];
    totalPrice: number;
    status: 'pending' | 'success' | 'failed';
}

interface OrderCreate {
    items: {
        id: string | number;
        quantity: number;
    }[];
    status: 'pending' | 'success' | 'failed';
}

export type { Order, OrderCreate };
