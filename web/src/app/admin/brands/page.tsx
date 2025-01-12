'use client';

import React, { useEffect, useState } from "react";
import Header from "@/app/_components/dashboard/header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useBrandStore from "@/shared/stores/brandStore";
import { getBrandData, updateBrand, createBrand } from "@/modules/brands/services/brandService";
import useAuthStore from "@/shared/stores/authStore";
import {
    Dialog,
    DialogFooter,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { brandSchema } from "@/modules/brands/validation/brandValidation";
import { set, z } from "zod";
import { Pencil } from "lucide-react";

export default function BrandsPage() {
    const token = useAuthStore((state) => state.token);
    const { brands, setBrands, editedItem, setEditedItem } = useBrandStore();

    useEffect(() => {
        const fetchBrands = async () => {
            if (token) {
                try {
                    const data = await getBrandData(token);
                    setBrands(data.items);
                } catch (error) {
                    console.error("Failed to fetch brands:", error);
                }
            }
        };

        fetchBrands();
    }, [token, setBrands]);

    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editDialogOpenForId, setEditDialogOpenForId] = useState<string | null>(null);

    const handleAddBrand = async () => {
        setError(null);
        setIsSubmitting(true);

        try {
            brandSchema.parse({ name });

            if (token) {
                const newBrand = await createBrand(token, name);
                setBrands([...brands, newBrand]);
                setName('');
            } else {
                setError('Token is missing');
            }
        } catch (validationError) {
            if (validationError instanceof z.ZodError) {
                setError(validationError.errors[0].message);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditBrand = async () => {
        if (!editedItem) return;
        setError(null);
        setIsSubmitting(true);

        try {
            brandSchema.parse({ name });

            if (token) {
                await updateBrand(token, editedItem.id, name);
                setBrands(
                    brands.map((brand) =>
                        brand.id === editedItem.id ? { ...brand, name } : brand
                    )
                );
                setEditedItem(null);
                setName('');
            } else {
                setError('Token is missing');
            }
        } catch (validationError) {
            if (validationError instanceof z.ZodError) {
                setError(validationError.errors[0].message);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setIsSubmitting(false);
            setEditDialogOpenForId(null);
        }
    };

    return (
        <div className="text-white">
            <div className="flex justify-between">
                <Header title="Marki" />
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="mb-4 bg-blue-600 hover:bg-blue-700">Dodaj</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] text-white bg-zinc-950">
                        <DialogHeader>
                            <DialogTitle>Dodaj Marke</DialogTitle>
                            <DialogDescription>
                                Dodaj nową markę pojazdu do bazy danych
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Nazwa
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Podaj nazwe"
                                    className="col-span-3"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                        <DialogFooter>
                            <Button
                                onClick={handleAddBrand}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Dodawanie...' : 'Dodaj'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div>
                <div className="overflow-hidden rounded-lg border border-zinc-200">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-zinc-950 hover:bg-transparent">
                                <TableHead className="font-semibold text-white py-3">Name</TableHead>
                                <TableHead className="font-semibold text-white py-3">Actions</TableHead>
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
                                                setEditedItem(brand);
                                                setName(brand.name);
                                                setEditDialogOpenForId(brand.id);
                                            }}
                                        />
                                        <Dialog
                                            open={editDialogOpenForId === brand.id}
                                            onOpenChange={(isOpen) => {
                                                if (!isOpen) setEditDialogOpenForId(null);
                                            }}
                                        >
                                            <DialogContent className="sm:max-w-[425px] text-white bg-zinc-950">
                                                <DialogHeader>
                                                    <DialogTitle>Edytuj Marke</DialogTitle>
                                                    <DialogDescription>
                                                        Zmień nazwę marki
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="edit-name" className="text-right">
                                                            Nazwa
                                                        </Label>
                                                        <Input
                                                            id="edit-name"
                                                            placeholder="Edytuj nazwe"
                                                            className="col-span-3"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                        />
                                                    </div>
                                                    {error && <p className="text-red-500">{error}</p>}
                                                </div>
                                                <DialogFooter>
                                                    <Button
                                                        onClick={handleEditBrand}
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting ? 'Zapisywanie...' : 'Zapisz'}
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
