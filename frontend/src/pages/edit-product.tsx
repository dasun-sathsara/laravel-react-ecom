import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import ProductForm from '@/components/add-product-form';
import { useEffect } from 'react';
import { SecondaryButtonType, ProductFormData } from '@/components/add-product-form';

export default function EditProductPage() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();

    const form = useForm<ProductFormData>({
        defaultValues: {
            productName: '',
            description: '',
            price: '0',
            discountedPrice: '0',
            isFeatured: false,
            stockCount: 0,
            category: 'electronics',
            productUrls: ['', '', ''],
            images: ['', '', ''],
        },
    });

    useEffect(() => {
        // Fetch product data based on productId and set form values
        // This is a mock implementation - replace with actual API call
        const mockProduct = {
            productName: 'Example Product',
            description: 'Product description',
            price: '99.99',
            discountedPrice: '89.99',
            isFeatured: true,
            stockCount: 10,
            category: 'electronics',
            productUrls: [
                'https://example.com/image1.jpg',
                'https://example.com/image2.jpg',
                'https://example.com/image3.jpg',
            ],
            images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
        };

        form.reset(mockProduct);
    }, [productId, form]);

    const onSubmit = async (data: ProductFormData) => {
        try {
            // Add your save logic here
            console.log('Saving product:', data);

            toast({
                title: 'Success',
                description: 'Product updated successfully',
            });

            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error',
                description: 'Failed to update product',
                variant: 'destructive',
            });
        }
    };

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
