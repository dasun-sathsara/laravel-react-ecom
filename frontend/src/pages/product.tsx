import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, ArrowLeft, AlertCircle, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    originalPrice?: string;
    image: string;
    images?: string[];
    category: string;
    stock: number;
    discount: number;
}

// Mock data for demonstration
const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Classic White Sneakers',
        description:
            'Premium quality white sneakers perfect for any casual outfit. Features comfortable cushioning and durable construction.',
        price: '$89.99',
        originalPrice: '$119.99',
        image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&h=350&q=80',
        images: [
            'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1600&h=900&q=80',
            'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1600&h=900&q=80',
            'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1600&h=900&q=80',
        ],
        category: 'footwear',
        stock: 12,
        discount: 25,
    },
    {
        id: 2,
        name: 'Leather Crossbody Bag',
        description: 'Elegant leather crossbody bag with multiple compartments and adjustable strap.',
        price: '$129.99',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=350&q=80',
        images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1600&h=900&q=80'],
        category: 'accessories',
        stock: 8,
        discount: 0,
    },
];

export function ProductPage() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { productId } = useParams();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    // Randomly select a product for demonstration
    const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];

    const updateQuantity = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
        }
    };

    // In a real app, this would be handled by your error boundary or loading state
    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                <h1 className="mt-4 text-2xl font-bold">Product Not Found</h1>
                <p className="mt-2 text-muted-foreground">
                    The product you're looking for doesn't exist or has been removed.
                </p>
                <Button onClick={() => navigate(-1)} className="mt-4">
                    Go Back
                </Button>
            </div>
        );
    }

    const handleAddToCart = () => {
        toast({
            title: 'Added to cart',
            description: `${quantity} ${quantity === 1 ? 'unit' : 'units'} of ${product.name} ${quantity === 1 ? 'has' : 'have'} been added to your cart.`,
        });
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/checkout');
    };

    return (
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-12">
            <Button
                variant="ghost"
                className="mb-8 -ml-2 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Product Images */}
                <div>
                    <Carousel className="w-full">
                        <CarouselContent>
                            {(product.images || [product.image]).map((image, index) => (
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
                <div className="flex flex-col h-full">
                    <div className="flex-1 space-y-6">
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <span className="text-sm text-muted-foreground capitalize -mt-4">
                            {product.category}
                        </span>
                        <div className="flex items-baseline gap-4">
                            <span className="text-3xl font-bold">{product.price}</span>
                            {product.originalPrice && (
                                <span className="text-xl text-muted-foreground line-through">
                                    {product.originalPrice}
                                </span>
                            )}
                            {product.discount > 0 && (
                                <Badge variant="secondary" className="text-sm">
                                    {product.discount}% OFF
                                </Badge>
                            )}
                        </div>

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

                        <Separator className="bg-muted/60" />

                        <div className="prose prose-gray max-w-none pt-2">
                            <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    <div className="mt-auto pt-8">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium">Quantity:</span>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => updateQuantity(quantity - 1)}
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <Input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => updateQuantity(parseInt(e.target.value))}
                                        className="w-16 text-center"
                                        min={1}
                                        max={product.stock}
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => updateQuantity(quantity + 1)}
                                        disabled={quantity >= product.stock}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Button size="lg" className="flex-1 font-medium" onClick={handleAddToCart}>
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Add to Cart
                                </Button>
                                <Button size="lg" variant="secondary" className="flex-1 font-medium" onClick={handleBuyNow}>
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
