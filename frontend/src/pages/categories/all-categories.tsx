import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useCategoryStore } from '@/store/categories-store';

function CategoryCardSkeleton() {
    return (
        <Card className="overflow-hidden border shadow-sm">
            <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden">
                    <Skeleton className="w-full h-full" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
            <div className="p-4 flex justify-between items-center bg-muted/30">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-9 w-36" />
            </div>
        </Card>
    );
}

export function CategoriesPage() {
    const { toast } = useToast();
    const { categories, isLoading, error, fetchCategories } = useCategoryStore();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        if (error) {
            toast({
                title: 'Error',
                description: error,
                duration: 3000,
                variant: 'destructive',
            });
        }
    }, [error, toast]);

    return (
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-16">
            <div className="text-center space-y-4 mb-16">
                <h1 className="text-4xl font-bold tracking-tight">Explore Our Categories</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Find everything you need, organized in convenient categories for your shopping experience
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading
                    ? Array.from({ length: 6 }).map((_, index) => (
                          <div key={`skeleton-${index}`}>
                              <CategoryCardSkeleton />
                          </div>
                      ))
                    : categories.map((category) => (
                          <Link
                              to={`/categories/${category.id}`}
                              key={category.id}
                              className="group block transition-transform hover:-translate-y-0.5 duration-300">
                              <Card className="overflow-hidden border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
                                  <div className="relative">
                                      <div className="relative aspect-[4/3] overflow-hidden">
                                          <img
                                              src={category.imageUrl}
                                              alt={category.name}
                                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:blur-[2px]"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
                                      </div>
                                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                          <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                                          <p className="text-sm text-white/80 line-clamp-2">{category.description}</p>
                                      </div>
                                  </div>
                                  <div className="p-4 flex justify-between items-center bg-muted/30">
                                      <Badge variant="secondary" className="bg-background/80 text-foreground">
                                          {category.itemCount?.toLocaleString() ?? 0} items
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
