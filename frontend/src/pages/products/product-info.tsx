import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useProductStore } from '@/store/product-store';

export function ProductPage() {
    const { id:productId } = useParams();

    const { product, isLoading, error, fetchProduct } = useProductStore();

    const { toast } = useToast();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProduct(productId!);
    }, [productId, fetchProduct]);

    const updateQuantity = (newQuantity: number) => {
        if (!product) return;

        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        if (!product) return;
        
        toast({
            title: 'Added to cart',
            description: `${quantity} ${quantity === 1 ? 'unit' : 'units'} of ${product.name} ${quantity === 1 ? 'has' : 'have'
                } been added to your cart.`,
        });
    };

    const handleBuyNow = () => {
        if (!product) return;

        handleAddToCart();
        navigate('/checkout');
    };

    if (error) {
        return (
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-red-600">Error</h2>
                    <p className="mt-2 text-gray-600">{error}</p>
                    <Button onClick={() => navigate(-1)} className="mt-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-12">
                <div className="space-y-8">
                    <Skeleton className="h-10 w-24" /> {/* Back button */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <Skeleton className="aspect-square rounded-lg" /> {/* Image */}
                        <div className="space-y-6">
                            <Skeleton className="h-10 w-3/4" /> {/* Title */}
                            <Skeleton className="h-6 w-1/4" /> {/* Category */}
                            <Skeleton className="h-8 w-1/3" /> {/* Price */}
                            <Skeleton className="h-24 w-full" /> {/* Description */}
                            <div className="space-y-4">
                                <Skeleton className="h-12 w-full" /> {/* Quantity */}
                                <div className="flex gap-4">
                                    <Skeleton className="h-10 flex-1" /> {/* Add to cart */}
                                    <Skeleton className="h-10 flex-1" /> {/* Buy now */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Product Not Found</h2>
                    <p className="mt-2 text-gray-600">The requested product could not be found.</p>
                    <Button onClick={() => navigate(-1)} className="mt-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-12">
            <Button
                variant="ghost"
                className="mb-8 -ml-2 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => navigate(-1)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Product Images */}
                <div>
                    <Carousel className="w-full">
                        <CarouselContent>
                            {(product.imageUrls || []).map((image, index) => (
                                <CarouselItem key={index}>
                                    <div className="aspect-square relative overflow-hidden rounded-lg">
                                        <img
                                            src={image}
                                            alt={`${product.name} - View ${index + 1}`}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2" />
                        <CarouselNext className="right-2" />
                    </Carousel>
                </div>

                {/* Product Info */}
                <div className="flex flex-col h-full justify-between">
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                            <span className="text-sm text-muted-foreground capitalize">{product.categoryName}</span>
                        </div>
                        <div className="flex items-baseline gap-4">
                            {product.discountedPrice ? (
                                <>
                                    <span className="text-3xl font-bold">${product.discountedPrice.toFixed(2)}</span>
                                    <span className="text-xl text-muted-foreground line-through">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    <Badge variant="secondary" className="text-sm">
                                        {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                                    </Badge>
                                </>
                            ) : (
                                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                            )}
                        </div>
                        <p className="text-muted-foreground">{product.description}</p>
                    </div>

                    <div className="space-y-6">
                        {/* Stock Information */}
                        <div>
                            <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {product.stock > 0 ? (
                                    <>
                                        In Stock ({product.stock} {product.stock === 1 ? 'item' : 'items'} left)
                                    </>
                                ) : (
                                    'Out of Stock'
                                )}
                            </span>
                        </div>
                        <Separator />
                        {/* Quantity Selection */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updateQuantity(quantity - 1)}
                                    disabled={quantity <= 1 || product.stock === 0}>
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <Input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => updateQuantity(parseInt(e.target.value) || 1)}
                                    min={1}
                                    max={product.stock}
                                    className="w-20 text-center"
                                    disabled={product.stock === 0}
                                />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updateQuantity(quantity + 1)}
                                    disabled={quantity >= product.stock || product.stock === 0}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <Button
                                    className="flex-1"
                                    variant="outline"
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}>
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Add to Cart
                                </Button>
                                <Button
                                    className="flex-1"
                                    onClick={handleBuyNow}
                                    disabled={product.stock === 0}>
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
