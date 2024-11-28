import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/components/product-card';
import { ProductLoading } from '@/components/product-loading';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { useProductStore } from '@/store/product-store';

interface ProductsGridProps {
    categoryId?: number;
}

export function ProductsGrid({ categoryId }: ProductsGridProps) {
    const { toast } = useToast();

    const {
        products,
        isLoading,
        pagination: { currentPage, totalProducts, hasNextPage, hasPreviousPage },
        fetchProducts,
    } = useProductStore();

    const itemsPerPage = 12;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    useEffect(() => {
        fetchProducts(currentPage, categoryId);
    }, [currentPage, fetchProducts, categoryId]);

    const handleAddToCart = () => {
        toast({
            title: 'Added to cart',
            description: 'The product has been added to your cart.',
        });
    };

    const handlePageChange = (page: number) => {
        if (page < currentPage && !hasPreviousPage) {
            return;
        }

        if (page > currentPage && !hasNextPage) {
            return;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });

        fetchProducts(page);
    };

    const generatePaginationItems = () => {
        const items = [];
        const maxVisiblePages = 3;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            items.push(
                <PaginationItem key="1">
                    <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
                </PaginationItem>,
            );
            if (startPage > 2) {
                items.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>,
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink onClick={() => handlePageChange(i)} isActive={currentPage === i}>
                        {i}
                    </PaginationLink>
                </PaginationItem>,
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                items.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>,
                );
            }
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
                </PaginationItem>,
            );
        }

        return items;
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {isLoading
                    ? Array.from({ length: itemsPerPage }).map((_, index) => (
                          <ProductLoading key={`skeleton-${index}`} />
                      ))
                    : products.map((product) => (
                          <Product key={product.id} product={product} onAddToCart={handleAddToCart} />
                      ))}
            </div>
            {!isLoading && totalPages > 1 && (
                <Pagination className="justify-center">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                        </PaginationItem>
                        {generatePaginationItems()}
                        <PaginationItem>
                            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </>
    );
}
