import { useState } from 'react';
import { useForm } from 'react-hook-form';

import ProductForm, { SecondaryButtonType } from '@/components/add-product-form';
import { DataTable } from '@/components/all-products-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface ProductFormData {
    productName: string;
    description: string;
    price: string;
    discountedPrice: string;
    isFeatured: boolean;
    stockCount: number;
    stockStatus: string;
    productUrl1: string;
    productUrl2: string;
    productUrl3: string;
    images: string[];
}

function DashboardPage() {
    const { toast } = useToast();

    const form = useForm<ProductFormData>({
        defaultValues: {
            productName: '',
            description: '',
            price: '',
            discountedPrice: '',
            isFeatured: false,
            stockCount: 0,
            stockStatus: '',
            productUrl1: '',
            productUrl2: '',
            productUrl3: '',
            images: ['', '', ''],
        },
    });

    const [products, setProducts] = useState([
        {
            id: '1',
            name: 'Example Product',
            price: '99.99',
            stock: 10,
            status: 'In Stock',
            featured: true,
        },
    ]);

    const handleDeleteProduct = (id: string) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const onSubmit = async (data: ProductFormData) => {
        try {
            // TODO: Replace with actual API call
            console.log('Submitting product:', data);

            // Add the new product to the list
            setProducts([
                ...products,
                {
                    id: (products.length + 1).toString(),
                    name: data.productName,
                    price: data.price,
                    stock: data.stockCount,
                    status: data.stockStatus,
                    featured: data.isFeatured,
                },
            ]);

            // Reset form
            form.reset();

            // Show success message
            toast({
                title: 'Success',
                description: 'Product created successfully',
            });
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error',
                description: 'Failed to create product',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-8">
            <Tabs defaultValue="createProduct" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="createProduct">Create Product</TabsTrigger>
                    <TabsTrigger value="allProducts">Products</TabsTrigger>
                </TabsList>
                <TabsContent value="createProduct" className="mt-6">
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
                </TabsContent>
                <TabsContent value="allProducts" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Products List</CardTitle>
                            <CardDescription>Manage your existing products</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DataTable
                                data={products}
                                columns={[
                                    {
                                        accessorKey: 'name',
                                        header: 'Name',
                                    },
                                    {
                                        accessorKey: 'price',
                                        header: 'Price',
                                    },
                                    {
                                        accessorKey: 'stock',
                                        header: 'Stock',
                                    },
                                    {
                                        accessorKey: 'status',
                                        header: 'Status',
                                    },
                                    {
                                        accessorKey: 'featured',
                                        header: 'Featured',
                                        cell: ({ row }) => <span>{row.original.featured ? 'Yes' : 'No'}</span>,
                                    },
                                    {
                                        id: 'actions',
                                        cell: ({ row }) => (
                                            <button
                                                onClick={() => handleDeleteProduct(row.original.id)}
                                                className="text-red-600 hover:text-red-800">
                                                Delete
                                            </button>
                                        ),
                                    },
                                ]}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default DashboardPage;
