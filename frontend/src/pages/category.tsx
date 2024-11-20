import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ProductsGrid } from '@/components/products';

export default function CategoryPage() {
    const length = 12;

    return (
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-12">
            <Button
                variant="ghost"
                className="mb-8 -ml-2 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => {}}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>

            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-3">Category Name</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Showing {length} items in this category
                </p>
            </div>

            <ProductsGrid />
        </div>
    );
}
