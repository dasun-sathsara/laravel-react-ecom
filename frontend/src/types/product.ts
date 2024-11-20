interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    discountedPrice?: number;
    primaryImageUrl: string;
    imageUrls: string[];
    stock: number;
    category: string;
    featured: boolean;
}

export type { Product };
