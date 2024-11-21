import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    itemCount: number;
}

const categories: Category[] = [
    {
        id: '1',
        name: 'Electronics',
        description: 'Discover cutting-edge gadgets and tech essentials',
        imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80',
        itemCount: 320,
    },
    {
        id: '2',
        name: 'Fashion',
        description: 'Explore the latest trends in clothing and accessories',
        imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80',
        itemCount: 450,
    },
    {
        id: '3',
        name: 'Home & Living',
        description: 'Transform your space with modern furniture and decor',
        imageUrl: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80',
        itemCount: 275,
    },
    {
        id: '4',
        name: 'Sports',
        description: 'Equipment and gear for every athlete',
        imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80',
        itemCount: 180,
    },
    {
        id: '5',
        name: 'Books',
        description: 'Dive into a world of knowledge and stories',
        imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80',
        itemCount: 520,
    },
    {
        id: '6',
        name: 'Beauty',
        description: 'Premium cosmetics and self-care essentials',
        imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80',
        itemCount: 410,
    },
];

export function CategoriesPage() {
    return (
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-16">
            <div className="text-center space-y-4 mb-16">
                <h1 className="text-4xl font-bold tracking-tight">Explore Our Categories</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Find everything you need, organized in convenient categories for your shopping experience
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category) => (
                    <Link
                        to={`/category/${category.id}`}
                        key={category.id}
                        className="group block transition-transform hover:-translate-y-0.5 duration-300">
                        <Card className="overflow-hidden border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
                            <div className="relative">
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={category.imageUrl}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-90" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                                    <p className="text-sm text-white/80 line-clamp-2">{category.description}</p>
                                </div>
                            </div>
                            <div className="p-4 flex justify-between items-center bg-muted/30">
                                <Badge variant="secondary" className="bg-background/80 text-foreground">
                                    {category.itemCount.toLocaleString()} items
                                </Badge>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-muted-foreground group-hover:text-primary/80">
                                    Browse Category <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
