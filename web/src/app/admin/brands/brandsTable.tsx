'use client'
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import BrandDialog from "./brandsDialog";
import { Brand } from "@/shared/types";
import { deleteBrand } from "@/modules/brands/services/brandService";
import useAuthStore from "@/shared/stores/authStore";
import { useRouter } from "next/navigation";

interface BrandsTableProps {
    brands: Brand[];
    onEdit: (brand: Brand) => void;
}

export default function BrandsTable({ brands, onEdit }: BrandsTableProps) {
    const [editDialogOpenForId, setEditDialogOpenForId] = useState<string | null>(null);
    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);
    const router = useRouter();

    const deleteBrandHandler = async (id: string) => {
        if (!token) return;

        try {
            await deleteBrand(token, id);
            router.refresh();
            brands = brands.filter((brand) => brand.id !== id);

        } catch (err) {
            console.error("Failed to delete brand:", err);
        }
    };

    return (
        <div className="overflow-hidden rounded-lg border border-[#3b3b3b]">
            <Table>
                <TableHeader>
                    <TableRow className="bg-[#1e1e1e] hover:bg-transparent border-[#3b3b3b]">
                        <TableHead className="font-semibold text-white py-3">Nazwa</TableHead>
                        <TableHead className="flex font-semibold text-white py-3 justify-end">Akcje</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {brands.map((brand) => (
                        <TableRow key={brand.id} className="hover:bg-[#0b0b0b] border-[#3b3b3b]">
                            <TableCell>{brand.name}</TableCell>
                            <TableCell className="flex justify-end space-x-2">
                                <Pencil
                                    className="h-5 w-5 cursor-pointer text-primary hover:text-[#895432]"
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
                                {user?.roles.includes("Admin") && (
                                    <Trash
                                        className="h-5 w-5 cursor-pointer text-red-500 hover:text-red-700"
                                        onClick={() => deleteBrandHandler(brand.id)}
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
