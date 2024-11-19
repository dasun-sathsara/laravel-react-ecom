import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
    category: string;
}

// Mock data - replace with actual API call
const generateMockProducts = () => {
    const products: Product[] = [];
    const categories = ['Electronics', 'Fashion', 'Home', 'Sports'];
    const adjectives = ['Premium', 'Luxury', 'Essential', 'Professional', 'Classic', 'Modern'];
    const items = ['Headphones', 'Watch', 'Bag', 'Shoes', 'Camera', 'Speaker', 'Laptop', 'Phone'];
    const imageIds = [
        'photo-1505740420928-5e560c06d30e', // Headphones
        'photo-1523275335684-37898b6baf30', // Watch
        'photo-1548036328-c9fa89d128fa', // Bag
        'photo-1542291026-7eec264cc27ff', // Shoes
        'photo-1516035069371-29a1b244cc32', // Camera
        'photo-1608043152269-423dbba4e7e1', // Speaker
        'photo-1496181133206-80ce9b88a853', // Laptop
        'photo-1511707171634-5f897ff02aa9', // Phone
    ];

    // Generate 32 products
    for (let i = 0; i < 32; i++) {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomItem = items[Math.floor(Math.random() * items.length)];
        const randomImageId = imageIds[Math.floor(Math.random() * imageIds.length)];
        const basePrice = Math.floor(Math.random() * 900) + 100; // Random price between 100 and 999
        const stock = Math.floor(Math.random() * 20); // Random stock between 0 and 19

        products.push({
            id: `product-${i + 1}`,
            name: `${randomAdjective} ${randomItem}`,
            description: `High-quality ${randomCategory.toLowerCase()} item with excellent features`,
            price: basePrice,
            imageUrl: `https://images.unsplash.com/${randomImageId}?w=800&h=800&q=80`,
            stock,
            category: randomCategory,
        });
    }

    return products;
};

const mockProducts = generateMockProducts();

export function ShopPage() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [currentPage, setCurrentPage] = useState(1);
    const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
    const [isLoading, setIsLoading] = useState(true);

    const itemsPerPage = 12;
    const totalPages = Math.ceil(mockProducts.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = mockProducts.slice(startIndex, endIndex);

    // Simulate loading state
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [currentPage]);

    const handleProductClick = (productId: string) => {
        navigate(`/product/${productId}`);
    };

    const handleAddToCart = (product: Product, e: React.MouseEvent) => {
        e.stopPropagation();
        toast({
            title: 'Added to Cart',
            description: `${product.name} has been added to your cart.`,
            duration: 3000,
        });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const generatePaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            items.push(
                <PaginationItem key="1">
                    <PaginationLink onClick={() => handlePageChange(1)} className="cursor-pointer hover:cursor-pointer">
                        1
                    </PaginationLink>
                </PaginationItem>
            );
            if (startPage > 2) {
                items.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        onClick={() => handlePageChange(i)}
                        isActive={currentPage === i}
                        className="cursor-pointer hover:cursor-pointer"
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                items.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        onClick={() => handlePageChange(totalPages)}
                        className="cursor-pointer hover:cursor-pointer"
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    return (
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-3">All Products</h2>
                <p className="text-sm text-muted-foreground mt-2">
                    Showing {startIndex + 1}-{Math.min(endIndex, mockProducts.length)} of {mockProducts.length} products
                </p>
            </div>

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
                          <Card
                              key={product.id}
                              className="group relative cursor-pointer"
                              onClick={() => handleProductClick(product.id)}
                          >
                              <CardContent className="p-0">
                                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                                      {!loadedImages[product.id] && (
                                          <div className="absolute inset-0 bg-muted animate-pulse" />
                                      )}
                                      <img
                                          src={product.imageUrl}
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
                                                  }`}
                                              >
                                                  {product.stock < 5 ? 'Low Stock' : 'In Stock'}
                                              </span>
                                          ) : (
                                              <span className="text-destructive">Out of Stock</span>
                                          )}
                                      </div>
                                      <Button
                                          className="w-full mt-4"
                                          onClick={(e) => handleAddToCart(product, e)}
                                          disabled={product.stock === 0}
                                      >
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
                        <PaginationPrevious
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="cursor-pointer hover:cursor-pointer disabled:cursor-not-allowed"
                        />
                    </PaginationItem>
                    {generatePaginationItems()}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="cursor-pointer hover:cursor-pointer disabled:cursor-not-allowed"
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

export default ShopPage;
