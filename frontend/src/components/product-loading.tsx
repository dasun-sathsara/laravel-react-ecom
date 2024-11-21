import { Card, CardContent } from '@/components/ui/card';

export function ProductLoading() {
    return (
        <Card className="group relative">
            <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted animate-pulse" />
                <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-muted rounded animate-pulse w-1/4" />
                    <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                    <div className="h-8 bg-muted rounded animate-pulse w-full mt-4" />
                </div>
            </CardContent>
        </Card>
    );
}
