import { Container } from './ui/container';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { useToast } from '@/hooks/use-toast';
import { Product } from './product';
import { ProductLoading } from './product-loading';
import { useState } from 'react';
import type { Product as ProductType } from '@/types/product';
import { mockProducts } from '@/lib/dummy-data';

const products: ProductType[] = mockProducts;

export function FeaturedProducts() {
    const { toast } = useToast();
    const [isLoading] = useState(false);

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
                            : products.map((product) => (
                                  <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                                      <Product
                                          product={product}
                                          onAddToCart={handleAddToCart}
                                          onClick={() => {
                                              // TODO: Implement product click handler
                                          }}
                                      />
                                  </CarouselItem>
                              ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex -left-12 text-primary hover:text-primary bg-background/80 hover:bg-background shadow-sm hover:shadow-md border-muted" />
                    <CarouselNext className="hidden md:flex -right-12 text-primary hover:text-primary bg-background/80 hover:bg-background shadow-sm hover:shadow-md border-muted" />
                </Carousel>
            </Container>
        </div>
    );
}
