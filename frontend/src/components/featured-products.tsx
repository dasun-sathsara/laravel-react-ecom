import { ShoppingCart } from 'lucide-react';
import { Container } from './ui/container';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const products = [
    {
        id: 1,
        name: 'Smartphone 12 Pro',
        price: '$999.99',
        originalPrice: '$1099.99',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=350&q=80',
        discount: 10,
        stock: 8,
    },
    {
        id: 2,
        name: 'Wireless Earbuds',
        price: '$199.99',
        image: 'https://images.unsplash.com/photo-1512499617640-c2f9990395d2?w=500&h=350&q=80',
    },
    {
        id: 3,
        name: '4K Action Camera',
        price: '$299.99',
        image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=500&h=350&q=80',
    },
    {
        id: 4,
        name: 'Gaming Laptop',
        price: '$1499.99',
        image: 'https://images.unsplash.com/photo-1517430816045-df4b7de6e730?w=500&h=350&q=80',
    },
    {
        id: 5,
        name: 'Smartwatch Series 6',
        price: '$399.99',
        image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=500&h=350&q=80',
    },
    {
        id: 6,
        name: 'VR Headset',
        price: '$499.99',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=350&q=80',
    },
    {
        id: 7,
        name: 'Bluetooth Speaker',
        price: '$149.99',
        image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=500&h=350&q=80',
    },
    {
        id: 8,
        name: 'Power Bank',
        price: '$29.99',
        image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=500&h=350&q=80',
    },
].map((product) => ({
    ...product,
    discount: product.discount || 0,
    stock: product.stock || Math.floor(Math.random() * 20),
    originalPrice: product.originalPrice || null,
}));

export function FeaturedProducts() {
    const { toast } = useToast();
    const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

    const handleAddToCart = (product: (typeof products)[0]) => {
        toast({
            title: 'Added to Cart',
            description: `${product.name} has been added to your cart.`,
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
                        {products.map((product) => (
                            <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                                <Card className="group relative">
                                    <CardContent className="p-0">
                                        <div className="relative aspect-square overflow-hidden rounded-t-lg">
                                            {!loadedImages[product.id] && (
                                                <div className="absolute inset-0 bg-muted animate-pulse" />
                                            )}
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className={`object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ${
                                                    loadedImages[product.id] ? 'opacity-100' : 'opacity-0'
                                                }`}
                                                onLoad={() =>
                                                    setLoadedImages((prev) => ({ ...prev, [product.id]: true }))
                                                }
                                            />
                                            {product.discount > 0 && (
                                                <span className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-medium">
                                                    -{product.discount}%
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                                                {product.name}
                                            </h3>
                                            <div className="mt-2 flex items-center gap-2">
                                                <span className="font-medium text-primary">{product.price}</span>
                                                {product.originalPrice && (
                                                    <span className="text-sm text-muted-foreground line-through">
                                                        {product.originalPrice}
                                                    </span>
                                                )}
                                            </div>
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
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-6 pt-0">
                                        <Button
                                            className="w-full"
                                            onClick={() => handleAddToCart(product)}
                                            disabled={product.stock === 0}>
                                            <ShoppingCart className="mr-2 h-4 w-4" />
                                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                        </Button>
                                    </CardFooter>
                                </Card>
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
