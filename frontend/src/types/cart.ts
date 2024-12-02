interface CartItem {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
    discountedPrice: number;
}

interface Cart {
    items: CartItem[];
    totalPrice: number;
    totalDiscount: number;
    totalItems: number;
}

export type { Cart, CartItem };
