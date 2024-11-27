interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    discountedPrice?: number;
    categoryId: number;
    categoryName: string;
    imageUrls: string[];
    stock: number;
    featured: boolean;
}

type ProductCard = Omit<Product, 'imageUrls'> & { imageUrl: string };

export type { Product, ProductCard };
