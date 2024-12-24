import { Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ROWS_PER_PAGE = 12;

interface Product {
    id: string;
    name: string;
    price: string;
    stock: number;
    status: string;
    featured: boolean;
}

interface DataTableProps {
    data: Product[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    isLoading?: boolean;
}

function TableRowSkeleton() {
    return (
        <TableRow>
            <TableCell>
                <Skeleton className="h-6 w-[180px]" />
            </TableCell>
            <TableCell>
                <Skeleton className="h-6 w-[80px]" />
            </TableCell>
            <TableCell className="text-center">
                <Skeleton className="h-6 w-[60px] mx-auto" />
            </TableCell>
            <TableCell>
                <Skeleton className="h-6 w-[100px]" />
            </TableCell>
            <TableCell className="text-center">
                <Skeleton className="h-6 w-[40px] mx-auto" />
            </TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                </div>
            </TableCell>
        </TableRow>
    );
}

export function DataTable({ data, onDelete, onEdit, isLoading }: DataTableProps) {
    const handleDelete = (id: string) => {
        onDelete(id);
    };

    const handleEdit = (id: string) => {
        onEdit(id);
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-semibold text-left">Name</TableHead>
                        <TableHead className="font-semibold text-left">Price</TableHead>
                        <TableHead className="font-semibold text-center">Stock</TableHead>
                        <TableHead className="font-semibold text-left">Status</TableHead>
                        <TableHead className="font-semibold text-center">Featured</TableHead>
                        <TableHead className="font-semibold text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        Array.from({ length: ROWS_PER_PAGE }).map((_, index) => <TableRowSkeleton key={index} />)
                    ) : (
                        <>
                            {data.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell className="text-center">{product.stock}</TableCell>
                                    <TableCell>{product.status}</TableCell>
                                    <TableCell className="text-center">{product.featured ? 'Yes' : 'No'}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(product.id)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(product.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {data.length < ROWS_PER_PAGE &&
                                Array.from({ length: ROWS_PER_PAGE - data.length }).map((_, index) => (
                                    <TableRow key={`empty-${index}`} className="h-12 hover:bg-transparent">
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                ))}
                        </>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
