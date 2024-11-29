import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { ProductCard as ProductCardType } from '@/types/product';

interface ProductProps {
    product: ProductCardType;
    onAddToCart?: () => void;
    onClick?: () => void;
}

export function Product({ product, onAddToCart, onClick }: ProductProps) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <Card className="group relative cursor-pointer" onClick={onClick}>
            <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden rounded-t-lg border border-border/80 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]">
                    {!isImageLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}
                    {product.discountedPrice && product.discountedPrice < product.price && (
                        <Badge variant="default" className="absolute top-2 right-2 z-10">
                            -{Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                        </Badge>
                    )}
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className={`object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ${
                            isImageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => setIsImageLoaded(true)}
                    />
                </div>
                <div className="p-6">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                        <span className="font-medium text-primary text-lg">
                            ${(product.discountedPrice || product.price).toFixed(2)}
                        </span>
                        {product.discountedPrice && product.discountedPrice < product.price && (
                            <span className="text-sm text-muted-foreground line-through">
                                ${product.price.toFixed(2)}
                            </span>
                        )}
                    </div>
                    <div className="mt-2 text-sm">
                        {product.stock > 0 ? (
                            <span className={`${product.stock < 5 ? 'text-yellow-600' : 'text-green-600'}`}>
                                {product.stock < 5 ? 'Low Stock' : 'In Stock'}
                            </span>
                        ) : (
                            <span className="text-destructive">Out of Stock</span>
                        )}
                    </div>
                    <Button
                        className="w-full mt-4"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart?.();
                        }}>
                        Add to Cart
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
