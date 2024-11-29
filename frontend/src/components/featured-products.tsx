import { useEffect } from 'react';

import { useToast } from '@/hooks/use-toast';
import { useProductsStore } from '@/store/products-store';

import { Product } from './product-card';
import { ProductLoading } from './product-loading';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Container } from './ui/container';

export function FeaturedProducts() {
    const { toast } = useToast();
    const {
        featuredProducts,
        isLoading,
        fetchFeaturedProductsError,
        fetchFeaturedProducts,
        clearFetchFeaturedProductsError,
    } = useProductsStore();

    useEffect(() => {
        fetchFeaturedProducts();
    }, [fetchFeaturedProducts]);

    // Display toast notification for fetchFeaturedProductsError
    useEffect(() => {
        if (fetchFeaturedProductsError) {
            toast({
                title: 'Error',
                description: fetchFeaturedProductsError,
                duration: 3000,
                variant: 'destructive',
            });
            clearFetchFeaturedProductsError(); // Clear the error after displaying the toast
        }
    }, [fetchFeaturedProductsError, toast, clearFetchFeaturedProductsError]);

    const handleAddToCart = () => {
        toast({
            title: 'Added to Cart',
            description: 'Product has been added to your cart.',
            duration: 3000,
        });
    };

    return (
        <div className="py-24 sm:py-32">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Featured Products</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover our handpicked selection of trending items
                    </p>
                </div>
                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    className="w-full">
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {isLoading
                            ? Array.from({ length: 4 }).map((_, index) => (
                                  <CarouselItem
                                      key={`skeleton-${index}`}
                                      className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                                      <ProductLoading />
                                  </CarouselItem>
                              ))
                            : featuredProducts.map((product) => (
                                  <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                                      <Product product={product} onAddToCart={handleAddToCart} />
                                  </CarouselItem>
                              ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </Container>
        </div>
    );
}
