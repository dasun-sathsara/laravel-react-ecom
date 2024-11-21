import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/components/product';
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
import type { Product as ProductType } from '@/types/product';

export function ProductsGrid() {
    const { toast } = useToast();
    const [currentPage] = useState(1);
    const [isLoading] = useState(true);

    const currentProducts: ProductType[] = [];
    const itemsPerPage = 12;
    const totalPages = 0;

    const handleAddToCart = () => {
        // TODO: Implement add to cart functionality
        toast({
            title: "Added to cart",
            description: "The product has been added to your cart.",
        });
    };

    const handlePageChange = () => {
        // TODO: Implement page change functionality
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
                    <PaginationLink onClick={() => handlePageChange()}>1</PaginationLink>
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
                    <PaginationLink onClick={() => handlePageChange()} isActive={currentPage === i}>
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
                    <PaginationLink onClick={() => handlePageChange()}>{totalPages}</PaginationLink>
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
                    : currentProducts.map((product) => (
                          <Product
                              key={product.id}
                              product={product}
                              onAddToCart={handleAddToCart}
                              onClick={() => {
                                  // TODO: Implement product click handler
                              }}
                          />
                      ))}
            </div>

            <Pagination className="mt-8">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange()} />
                    </PaginationItem>
                    {generatePaginationItems()}
                    <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange()} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
}
