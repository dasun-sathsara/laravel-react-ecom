import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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
}

export function DataTable({ data, onDelete }: DataTableProps) {
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleEdit = (id: string) => {
        navigate(`/dashboard/edit-product/${id}`);
    };

    const handleDelete = (id: string) => {
        onDelete(id);
        toast({
            title: 'Product deleted',
            description: 'The product has been deleted successfully.',
        });
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
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
