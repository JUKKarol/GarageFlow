'use client';

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import useModelStore from "@/shared/stores/modelStore";
import useAuthStore from "@/shared/stores/authStore";
import { getModelData } from "@/modules/models/services/modelService";
import { Model } from "@/shared/types";
import { Pencil, Plus } from "lucide-react";
import ModelsDialog from "./modelsDialog";

interface ModelsTableProps {
    brands: { id: string; name: string }[];
}

export default function ModelsTable({ brands }: ModelsTableProps) {
    const { models, setModels, brandId, setBrandId } = useModelStore();
    const token = useAuthStore((state) => state.token);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState<Model | null>(null);
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
        if (brands.length > 0) {
            setBrandId(brands[0].id);
            fetchModels(brands[0].id);
        }
    }, [brands]);

    const handleBrandChange = (brandId: string) => {
        setBrandId(brandId);
        fetchModels(brandId);
    };

    const handleEdit = (model: Model) => {
        setSelectedModel(model);
        setIsDialogOpen(true);
    };

    const handleAdd = () => {
        setSelectedModel(null);
        setIsDialogOpen(true);
    };

    const handleSave = (model: Model) => {
        if (selectedModel) {
            setModels(models.map(m => m.id === model.id ? model : m));
        } else {
            setModels([...models, model]);
        }
    };

    return (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
                <Select
                    value={brandId || undefined}
                    onValueChange={handleBrandChange}
                >
                    <SelectTrigger id="brand-select" className="w-[200px]">
                        <SelectValue placeholder="Wybierz markę" />
                    </SelectTrigger>
                    <SelectContent>
                        {brands.map((brand) => (
                            <SelectItem key={brand.id} value={brand.id}>
                                {brand.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button className="mb-4 bg-blue-600 hover:bg-blue-700" onClick={handleAdd}>
                    <Plus className="mr-2 h-5 w-5" /> Dodaj Model
                </Button>
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
                                <TableHead className="font-semibold text-white py-3">Akcje</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {models.map((model) => (
                                <TableRow key={model.id} className="hover:bg-zinc-950">
                                    <TableCell>{model.name}</TableCell>
                                    <TableCell>
                                        <Pencil className="h-5 w-5 cursor-pointer text-blue-600 hover:text-blue-800"
                                            onClick={() => handleEdit(model)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {isDialogOpen && (
                <ModelsDialog
                    model={selectedModel}
                    onClose={() => setIsDialogOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}
