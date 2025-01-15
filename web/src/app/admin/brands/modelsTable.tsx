'use client';

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useModelStore from "@/shared/stores/modelStore";
import useAuthStore from "@/shared/stores/authStore";
import { getModelData } from "@/modules/models/services/modelService";
import { Brand } from "@/shared/types";
import { Pencil } from "lucide-react";

interface ModelsTableProps {
    brands: Brand[];
}

export default function ModelsTable({ brands }: ModelsTableProps) {
    const { models, setModels, brandId, setBrandId, brandName, setBrandName } = useModelStore();
    const token = useAuthStore((state) => state.token);
    const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchModels = async (brandId: string) => {
        if (!token) return;

        setIsLoading(true);
        setError(null);

        try {
            const data = await getModelData(token, brandId);
            setModels(data.items);

        } catch (err) {
            console.error("Failed to fetch models:", err);
            setError("Failed to fetch models. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!brands[0]) return;
        setBrandId(brands[0].id);
        setBrandName(brands[0].name);
        if (!brandId) return;
        fetchModels(brandId);

    }, [brands]);



    const handleBrandChange = (brandId: string) => {
        setSelectedBrandId(brandId);
        fetchModels(brandId);
    };

    return (
        <div className="mt-8">
            <div className="mb-4">
                <Select
                    value={selectedBrandId || undefined}
                    onValueChange={handleBrandChange}
                >
                    <SelectTrigger id="brand-select" className="w-[200px]">
                        <SelectValue placeholder="Wybierz model" />
                    </SelectTrigger>
                    <SelectContent>
                        {brands.map((brand) => (
                            <SelectItem key={brand.id} value={brand.id}>
                                {brand.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {isLoading ? (
                <p>Loading models...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="overflow-hidden rounded-lg border border-zinc-200">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-zinc-950 hover:bg-transparent">
                                <TableHead className="font-semibold text-white py-3">Model</TableHead>
                                <TableHead className="font-semibold text-white py-3">Marka</TableHead>
                                <TableHead className="font-semibold text-white py-3">Akcje</TableHead>
                            </TableRow>
                        </TableHeader>
                        {models.length > 0 && (
                            <TableBody>
                                {models.map((model) => (
                                    <TableRow key={model.id} className="hover:bg-zinc-950">
                                        <TableCell>{model.name}</TableCell>
                                        <TableCell>{brandName}</TableCell>
                                        <TableCell>
                                            <Pencil className="h-5 w-5 cursor-pointer text-blue-600 hover:text-blue-800"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                    </Table>
                    {models.length === 0 && (
                        <p className="text-gray-500 m-2">Nie znaleziono modeli.</p>
                    )}
                </div>
            )}
        </div>
    );
}
