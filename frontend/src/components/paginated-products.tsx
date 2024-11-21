import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

import { useToast } from '@/hooks/use-toast';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

import type { Product } from '@/types/product';

export function ProductsGrid() {
    useToast();
    const [currentPage] = useState(1);
    const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
    const [isLoading] = useState(true);

    const currentProducts: Product[] = [];

    const itemsPerPage = 12;
    const totalPages = 0;

    const handleAddToCart = () => {
        // TODO:
    };

    const handlePageChange = () => {};

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
                    ? // Loading skeleton
                      Array.from({ length: itemsPerPage }).map((_, index) => (
                          <Card key={`skeleton-${index}`} className="group relative">
                              <CardContent className="p-0">
                                  <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted animate-pulse" />
                                  <div className="p-6 space-y-3">
                                      <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                                      <div className="h-4 bg-muted rounded animate-pulse w-1/4" />
                                      <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                                      <div className="h-8 bg-muted rounded animate-pulse w-full mt-4" />
                                  </div>
                              </CardContent>
                          </Card>
                      ))
                    : currentProducts.map((product) => (
                          <Card key={product.id} className="group relative cursor-pointer" onClick={() => {}}>
                              <CardContent className="p-0">
                                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                                      {!loadedImages[product.id] && (
                                          <div className="absolute inset-0 bg-muted animate-pulse" />
                                      )}
                                      <img
                                          src={product.primaryImageUrl}
                                          alt={product.name}
                                          className={`object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ${
                                              loadedImages[product.id] ? 'opacity-100' : 'opacity-0'
                                          }`}
                                          onLoad={() => setLoadedImages((prev) => ({ ...prev, [product.id]: true }))}
                                      />
                                  </div>
                                  <div className="p-6">
                                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                                          {product.name}
                                      </h3>
                                      <div className="mt-2 font-medium text-primary">${product.price.toFixed(2)}</div>
                                      <div className="mt-2 text-sm">
                                          {product.stock > 0 ? (
                                              <span
                                                  className={`${
                                                      product.stock < 5 ? 'text-yellow-600' : 'text-green-600'
                                                  }`}>
                                                  {product.stock < 5 ? 'Low Stock' : 'In Stock'}
                                              </span>
                                          ) : (
                                              <span className="text-destructive">Out of Stock</span>
                                          )}
                                      </div>
                                      <Button
                                          className="w-full mt-4"
                                          onClick={() => {
                                              handleAddToCart();
                                          }}>
                                          Add to Cart
                                      </Button>
                                  </div>
                              </CardContent>
                          </Card>
                      ))}
            </div>

            <Pagination className="mt-8">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => {}} />
                    </PaginationItem>
                    {generatePaginationItems()}
                    <PaginationItem>
                        <PaginationNext onClick={() => {}} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
}
