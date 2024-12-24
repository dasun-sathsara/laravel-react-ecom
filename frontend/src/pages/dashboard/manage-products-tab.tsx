import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DataTable } from '@/components/all-products-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { useToast } from '@/hooks/use-toast';
import { useProductsStore } from '@/store/products-store';

export function ManageProductsTab() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [currentPage, setCurrentPage] = useState(1);

    const { products, isLoading, fetchProductsError, deleteProduct, fetchProducts, pagination } = useProductsStore();

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage, fetchProducts]);

    const handleEdit = (id: string) => {
        navigate(`/products/${id}/edit`);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteProduct(id);
            toast({
                title: 'Success',
                description: 'Product deleted successfully',
            });
            // Refresh the current page
            fetchProducts(currentPage);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete product',
                variant: 'destructive',
            });
        }
    };

    if (fetchProductsError) {
        return (
            <div className="min-h-[400px] w-full flex items-center justify-center">
                <div className="text-destructive">Error: {fetchProductsError}</div>
            </div>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Products List</CardTitle>
                <CardDescription>Manage your existing products</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <DataTable
                    data={products.map((product) => ({
                        ...product,
                        price: product.price.toFixed(2),
                        status: product.stock > 0 ? 'In Stock' : 'Out of Stock',
                    }))}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    isLoading={isLoading}
                />

                {pagination.totalProducts > 0 && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                    aria-disabled={!pagination.hasPreviousPage}
                                    className={!pagination.hasPreviousPage ? 'pointer-events-none opacity-50' : ''}
                                />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                    aria-disabled={!pagination.hasNextPage}
                                    className={!pagination.hasNextPage ? 'pointer-events-none opacity-50' : ''}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </CardContent>
        </Card>
    );
}
