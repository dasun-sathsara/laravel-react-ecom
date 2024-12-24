import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import ProductForm from '@/components/product-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useProductsStore } from '@/store/products-store';
import { SecondaryButtonType } from '@/types/form';
import { ProductFormData, ProductFormSchema } from '@/types/product';

export default function EditProductPage() {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { updateProduct, selectedProduct, fetchProduct, isLoading, fetchProductError } = useProductsStore();
    const [isInitialized, setIsInitialized] = useState(false);

    const form = useForm<ProductFormData>({
        resolver: zodResolver(ProductFormSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            discountedPrice: undefined,
            featured: false,
            stock: 0,
            categoryId: '',
            imageUrls: '',
        },
    });

    useEffect(() => {
        if (productId) {
            fetchProduct(productId);
        }
    }, [productId, fetchProduct]);

    useEffect(() => {
        if (selectedProduct) {
            const formData: ProductFormData = {
                name: selectedProduct.name,
                description: selectedProduct.description,
                price: selectedProduct.price,
                discountedPrice: selectedProduct.discountedPrice,
                featured: Boolean(selectedProduct.featured),
                stock: selectedProduct.stock,
                categoryId: selectedProduct.categoryId.toString(),
                imageUrls: selectedProduct.imageUrls.join('\n'),
            };
            form.reset(formData);
            setIsInitialized(true);
        }
    }, [selectedProduct, form]);

    const onSubmit = async (data: ProductFormData) => {
        if (!productId) return;

        try {
            const imageUrls = data.imageUrls
                .split('\n')
                .map((url) => url.trim())
                .filter((url) => url !== '');

            await updateProduct(productId, {
                ...data,
                categoryId: parseInt(data.categoryId, 10),
                imageUrls,
            });

            toast({
                title: 'Success',
                description: 'Product updated successfully',
            });

            navigate('/dashboard');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update product',
                variant: 'destructive',
            });
        }
    };

    // Show loading state while fetching or before initialization
    if (isLoading || !isInitialized) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (fetchProductError) {
        return (
            <div className="min-h-[400px] w-full flex items-center justify-center">
                <div className="text-destructive">Error: {fetchProductError}</div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Product</CardTitle>
                    <CardDescription>Update the product information below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProductForm
                        form={form}
                        onSubmit={onSubmit}
                        submitText="Update Product"
                        secondaryButton={SecondaryButtonType.Back}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
