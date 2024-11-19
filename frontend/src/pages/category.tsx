import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Item {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
}

// Mock data - replace with actual API call
const mockItems: Item[] = [
    {
        id: '1',
        name: 'Premium Product',
        description: 'High-quality item with excellent features',
        price: 299.99,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
        stock: 10,
    },
    {
        id: '2',
        name: 'Wireless Earbuds',
        description: 'True wireless earbuds with noise cancellation',
        price: 149.99,
        imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df',
        stock: 15,
    },
    {
        id: '3',
        name: 'Smart Watch',
        description: 'Fitness tracking and notifications on your wrist',
        price: 199.99,
        imageUrl: 'https://images.unsplash.com/photo-1544117519-31a4b719223d',
        stock: 8,
    },
    {
        id: '4',
        name: 'Laptop Stand',
        description: 'Ergonomic aluminum laptop stand for better posture',
        price: 49.99,
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46',
        stock: 20,
    },
    {
        id: '5',
        name: 'Mechanical Keyboard',
        description: 'RGB backlit mechanical gaming keyboard',
        price: 129.99,
        imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212',
        stock: 12,
    },
    {
        id: '6',
        name: 'USB-C Hub',
        description: 'Multi-port adapter with HDMI and card reader',
        price: 79.99,
        imageUrl: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9',
        stock: 25,
    },
    {
        id: '7',
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with long battery life',
        price: 39.99,
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46',
        stock: 30,
    },
    {
        id: '8',
        name: 'Monitor Light Bar',
        description: 'LED monitor light for reduced eye strain',
        price: 89.99,
        imageUrl: 'https://images.unsplash.com/photo-1586776977607-310e9c725c37',
        stock: 18,
    },
];

export default function CategoryPage() {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const observer = useRef<IntersectionObserver>();
    const { toast } = useToast();
    const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

    const lastItemRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    useEffect(() => {
        // Simulate API call
        const fetchItems = async () => {
            setLoading(true);
            try {
                // Replace with actual API call
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const itemsPerPage = 8;
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                const newItems = mockItems.slice(start, end);

                setItems((prev) => (page === 1 ? newItems : [...prev, ...newItems]));
                setHasMore(end < mockItems.length);
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [categoryId, page]);

    const handleProductClick = (productId: string) => {
        navigate(`/product/${productId}`);
    };

    const handleAddToCart = (item: Item, e: React.MouseEvent) => {
        e.stopPropagation();
        toast({
            title: 'Added to Cart',
            description: `${item.name} has been added to your cart.`,
            duration: 3000,
        });
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

            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-3">Category Name</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Showing {items.length} items in this category
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((item, index) => (
                    <Card
                        key={item.id}
                        ref={index === items.length - 1 ? lastItemRef : null}
                        className="group relative cursor-pointer"
                        onClick={() => handleProductClick(item.id)}
                    >
                        <CardContent className="p-0">
                            <div className="relative aspect-square overflow-hidden rounded-t-lg">
                                {!loadedImages[item.id] && <div className="absolute inset-0 bg-muted animate-pulse" />}
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className={`object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ${loadedImages[item.id] ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    onLoad={() => setLoadedImages((prev) => ({ ...prev, [item.id]: true }))}
                                />
                                {item.stock < 5 && (
                                    <span className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-medium">
                                        Low Stock: {item.stock}
                                    </span>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="font-semibold group-hover:text-primary transition-colors">
                                    {item.name}
                                </h3>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="font-medium text-primary">${item.price}</span>
                                </div>
                                <div className="mt-2 text-sm">
                                    {item.stock > 0 ? (
                                        <span className={`${item.stock < 5 ? 'text-yellow-600' : 'text-green-600'}`}>
                                            {item.stock < 5 ? 'Low Stock' : 'In Stock'}
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
                                onClick={(e) => handleAddToCart(item, e)}
                                disabled={item.stock === 0}
                            >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
