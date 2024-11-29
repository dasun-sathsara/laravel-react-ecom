import { AlertCircle, ArrowLeft, Minus,Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export function ProductPage() {
    const { productId } = useParams();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    const updateQuantity = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        toast({
            title: 'Added to cart',
            description: `${quantity} ${quantity === 1 ? 'unit' : 'units'} of ${product.name} ${
                quantity === 1 ? 'has' : 'have'
            } been added to your cart.`,
        });
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/checkout');
    };

    return <div></div>;

    // return (
    //     <div classname="mx-auto w-full max-w-7xl px-6 lg:px-8 py-12">
    //         <button
    //             variant="ghost"
    //             classname="mb-8 -ml-2 flex items-center text-muted-foreground hover:text-foreground transition-colors"
    //             onclick={() => navigate(-1)}>
    //             <arrowleft classname="mr-2 h-4 w-4" />
    //             back
    //         </button>

    //         <div classname="grid md:grid-cols-2 gap-8">
    //             {/* product images */}
    //             <div>
    //                 <carousel classname="w-full">
    //                     <carouselcontent>
    //                         {(product.images || [product.image]).map((image, index) => (
    //                             <carouselitem key={index}>
    //                                 <div classname="aspect-square relative overflow-hidden rounded-lg">
    //                                     <img
    //                                         src={image}
    //                                         alt={`${product.name} - view ${index + 1}`}
    //                                         classname="object-cover w-full h-full"
    //                                     />
    //                                 </div>
    //                             </carouselitem>
    //                         ))}
    //                     </carouselcontent>
    //                     <carouselprevious classname="left-2" />
    //                     <carouselnext classname="right-2" />
    //                 </carousel>
    //             </div>

    //             {/* product info */}
    //             <div classname="flex flex-col h-full">
    //                 <div classname="flex-1 space-y-6">
    //                     <h1 classname="text-3xl font-bold">{product.name}</h1>
    //                     <span classname="text-sm text-muted-foreground capitalize -mt-4">{product.category}</span>
    //                     <div classname="flex items-baseline gap-4">
    //                         <span classname="text-3xl font-bold">{product.price}</span>
    //                         {product.originalprice && (
    //                             <span classname="text-xl text-muted-foreground line-through">
    //                                 {product.originalprice}
    //                             </span>
    //                         )}
    //                         {product.discount > 0 && (
    //                             <badge variant="secondary" classname="text-sm">
    //                                 {product.discount}% off
    //                             </badge>
    //                         )}
    //                     </div>

    //                     {/* stock information */}
    //                     <div>
    //                         <span classname={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
    //                             {product.stock > 0 ? (
    //                                 <>
    //                                     in stock ({product.stock} {product.stock === 1 ? 'item' : 'items'} left)
    //                                 </>
    //                             ) : (
    //                                 'out of stock'
    //                             )}
    //                         </span>
    //                     </div>

    //                     <separator classname="bg-muted/60" />

    //                     <div classname="prose prose-gray max-w-none pt-2">
    //                         <p classname="text-muted-foreground whitespace-pre-line leading-relaxed">
    //                             {product.description}
    //                         </p>
    //                     </div>
    //                 </div>

    //                 <div classname="mt-auto pt-8">
    //                     <div classname="flex flex-col gap-4">
    //                         <div classname="flex items-center gap-4">
    //                             <span classname="text-sm font-medium">quantity:</span>
    //                             <div classname="flex items-center gap-2">
    //                                 <button
    //                                     variant="outline"
    //                                     size="icon"
    //                                     onclick={() => updatequantity(quantity - 1)}
    //                                     disabled={quantity <= 1}>
    //                                     <minus classname="h-4 w-4" />
    //                                 </button>
    //                                 <input
    //                                     type="number"
    //                                     value={quantity}
    //                                     onchange={(e) => updatequantity(parseint(e.target.value))}
    //                                     classname="w-16 text-center"
    //                                     min={1}
    //                                     max={product.stock}
    //                                 />
    //                                 <button
    //                                     variant="outline"
    //                                     size="icon"
    //                                     onclick={() => updatequantity(quantity + 1)}
    //                                     disabled={quantity >= product.stock}>
    //                                     <plus classname="h-4 w-4" />
    //                                 </button>
    //                             </div>
    //                         </div>
    //                         <div classname="flex gap-4">
    //                             <button size="lg" classname="flex-1 font-medium" onclick={handleaddtocart}>
    //                                 <shoppingcart classname="mr-2 h-4 w-4" />
    //                                 add to cart
    //                             </button>
    //                             <button
    //                                 size="lg"
    //                                 variant="secondary"
    //                                 classname="flex-1 font-medium"
    //                                 onclick={handlebuynow}>
    //                                 buy now
    //                             </button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
}
