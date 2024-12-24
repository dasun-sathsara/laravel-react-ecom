import { z } from 'zod';

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

interface ProductFormData {
    name: string;
    description: string;
    price: number;
    discountedPrice?: number;
    featured: boolean;
    stock: number;
    categoryId: string;
    imageUrls: string;
}

const ProductFormSchema = z.object({
    name: z.string().min(1, 'Product name is required').max(255, 'Product name is too long'),
    description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description is too long'),
    price: z.coerce.number().min(0, 'Price must be 0 or greater').nonnegative(),
    discountedPrice: z.coerce
        .number()
        .min(0, 'Discounted price must be 0 or greater')
        .optional()
        .refine((price) => price === undefined || price === 0 || price > 0, 'Discounted price must be greater than 0'),
    categoryId: z.string({
        required_error: 'Please select a category',
        invalid_type_error: 'Please select a category',
    }),
    stock: z.coerce.number().min(0, 'Stock must be 0 or greater').nonnegative().int('Stock must be a whole number'),
    featured: z.boolean().default(false),
    imageUrls: z
        .string()
        .min(1, 'At least one image URL is required')
        .refine((val) => {
            const urls = val
                .split('\n')
                .map((url) => url.trim())
                .filter((url) => url !== '');
            return urls.every((url) => /^https?:\/\/.+\..+/.test(url));
        }, 'All image URLs must be valid URLs'),
});

export type { Product, ProductCard, ProductFormData };

export { ProductFormSchema };
