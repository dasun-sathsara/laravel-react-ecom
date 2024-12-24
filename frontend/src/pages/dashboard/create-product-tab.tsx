import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import ProductForm from '@/components/product-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useProductsStore } from '@/store/products-store';
import { SecondaryButtonType } from '@/types/form';
import type { ProductFormData } from '@/types/product';
import { ProductFormSchema } from '@/types/product';

export function CreateProductTab() {
    const { toast } = useToast();
    const addProduct = useProductsStore((state) => state.addProduct);

    const form = useForm<ProductFormData>({
        resolver: zodResolver(ProductFormSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            discountedPrice: undefined,
            categoryId: '',
            stock: 0,
            featured: false,
            imageUrls: '',
        },
    });

    const onSubmit = async (data: ProductFormData) => {
        try {
            const imageUrls = data.imageUrls
                .split('\n')
                .map((url) => url.trim())
                .filter((url) => url !== '');

            await addProduct({
                ...data,
                categoryId: parseInt(data.categoryId, 10),
                imageUrls,
            });
            form.reset();
            toast({
                title: 'Success',
                description: 'Product created successfully',
            });

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_: unknown) {
            toast({
                title: 'Error',
                description: 'Failed to create product',
                variant: 'destructive',
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create New Product</CardTitle>
                <CardDescription>
                    Add a new product to your store. Fill in all the required information below.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ProductForm
                    form={form}
                    onSubmit={onSubmit}
                    submitText="Create Product"
                    secondaryButton={SecondaryButtonType.Reset}
                />
            </CardContent>
        </Card>
    );
}
