import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil } from "lucide-react";
import BrandDialog from "./brandsDialog";
import { Brand } from "@/shared/types";

interface BrandsTableProps {
    brands: Brand[];
    onEdit: (brand: Brand) => void;
}

export default function BrandsTable({ brands, onEdit }: BrandsTableProps) {
    const [editDialogOpenForId, setEditDialogOpenForId] = useState<string | null>(null);

    return (
        <div className="overflow-hidden rounded-lg border border-zinc-200">
            <Table>
                <TableHeader>
                    <TableRow className="bg-zinc-950 hover:bg-transparent">
                        <TableHead className="font-semibold text-white py-3">Nazwa</TableHead>
                        <TableHead className="font-semibold text-white py-3">Akcje</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {brands.map((brand) => (
                        <TableRow key={brand.id} className="hover:bg-zinc-950">
                            <TableCell>{brand.name}</TableCell>
                            <TableCell>
                                <Pencil
                                    className="h-5 w-5 cursor-pointer text-blue-600 hover:text-blue-800"
                                    onClick={() => {
                                        onEdit(brand);
                                        setEditDialogOpenForId(brand.id);
                                    }}
                                />
                                {editDialogOpenForId === brand.id && (
                                    <BrandDialog
                                        brand={brand}
                                        isOpen={true}
                                        onClose={() => setEditDialogOpenForId(null)}
                                    />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
