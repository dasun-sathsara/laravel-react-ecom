import { AlertCircle, ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useCartStore } from '@/store/cart-store';
import { useProductsStore } from '@/store/products-store';

export function ProductPage() {
    const { id: productId } = useParams();

    const { selectedProduct, isLoading, fetchProductError, fetchProduct } = useProductsStore();
    const { addItem, addItemError } = useCartStore();

    const { toast } = useToast();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    useEffect(() => {
        fetchProduct(productId!);
    }, [productId, fetchProduct]);

    useEffect(() => {
        if (addItemError) {
            toast({
                title: 'Error',
                description: addItemError,
                variant: 'destructive',
            });
        }
    }, [addItemError, toast]);

    const updateQuantity = (newQuantity: number) => {
        if (!selectedProduct) return;

        if (newQuantity >= 1 && newQuantity <= selectedProduct.stock) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = async () => {
        if (!selectedProduct) return;

        setIsAddingToCart(true);
        try {
            await addItem(selectedProduct, quantity);
            if (!addItemError) {
                toast({
                    title: 'Added to cart',
                    description: `${quantity} ${quantity === 1 ? 'unit' : 'units'} of ${selectedProduct.name} ${
                        quantity === 1 ? 'has' : 'have'
                    } been added to your cart.`,
                });
            }
        } finally {
            setIsAddingToCart(false);
        }
    };

    const handleBuyNow = async () => {
        if (!selectedProduct) return;

        setIsAddingToCart(true);
        try {
            await addItem(selectedProduct, quantity);
            if (!addItemError) {
                navigate('/checkout');
            }
        } finally {
            setIsAddingToCart(false);
        }
    };

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

    if (!selectedProduct) {
        return (
            <div className="flex flex-col items-center justify-center space-y-6 flex-1 min-h-[70vh]">
                <div className="text-center space-y-4">
                    <AlertCircle className="h-10 w-10  mx-auto" />
                    <h2 className="text-xl font-semibold tracking-tight">Error Loading Product</h2>
                    <p className="text-base text-muted-foreground max-w-md mx-auto">{fetchProductError}</p>
                </div>
                <Button variant={'outline'} onClick={() => fetchProduct(productId!)}>
                    Try Again
                </Button>
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
                    <Carousel className="w-full border rounded-lg p-4">
                        <CarouselContent>
                            {(selectedProduct.imageUrls || []).map((image, index) => (
                                <CarouselItem key={index}>
                                    <div className="aspect-square relative overflow-hidden rounded-lg">
                                        <img
                                            src={image}
                                            alt={`${selectedProduct.name} - View ${index + 1}`}
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
                            <h1 className="text-3xl font-bold">{selectedProduct.name}</h1>
                            <span className="text-sm text-muted-foreground capitalize">
                                {selectedProduct.categoryName}
                            </span>
                        </div>
                        <div className="flex items-baseline gap-4">
                            {selectedProduct.discountedPrice ? (
                                <>
                                    <span className="text-3xl font-bold">
                                        ${selectedProduct.discountedPrice.toFixed(2)}
                                    </span>
                                    <span className="text-xl text-muted-foreground line-through">
                                        ${selectedProduct.price.toFixed(2)}
                                    </span>
                                    <Badge variant="secondary" className="text-sm">
                                        {Math.round(
                                            ((selectedProduct.price - selectedProduct.discountedPrice) /
                                                selectedProduct.price) *
                                                100,
                                        )}
                                        % OFF
                                    </Badge>
                                </>
                            ) : (
                                <span className="text-3xl font-bold">${selectedProduct.price.toFixed(2)}</span>
                            )}
                        </div>
                        <p className="text-muted-foreground">{selectedProduct.description}</p>
                    </div>

                    <div className="space-y-6">
                        {/* Stock Information */}
                        <div>
                            <span
                                className={`text-sm ${selectedProduct.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {selectedProduct.stock > 0 ? (
                                    <>
                                        In Stock ({selectedProduct.stock}{' '}
                                        {selectedProduct.stock === 1 ? 'item' : 'items'} left)
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
                                    disabled={quantity <= 1 || selectedProduct.stock === 0}>
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <Input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => updateQuantity(parseInt(e.target.value) || 1)}
                                    min={1}
                                    max={selectedProduct.stock}
                                    className="w-20 text-center"
                                    disabled={selectedProduct.stock === 0}
                                />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updateQuantity(quantity + 1)}
                                    disabled={quantity >= selectedProduct.stock || selectedProduct.stock === 0}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <Button
                                    className="flex-1"
                                    variant="outline"
                                    onClick={handleAddToCart}
                                    disabled={selectedProduct.stock === 0 || isAddingToCart}>
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                                </Button>
                                <Button
                                    className="flex-1"
                                    onClick={handleBuyNow}
                                    disabled={selectedProduct.stock === 0 || isAddingToCart}>
                                    {isAddingToCart ? 'Adding...' : 'Buy Now'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
