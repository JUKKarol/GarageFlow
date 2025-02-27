'use client';

import React, { useEffect, useState, useCallback } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import useModelStore from "@/shared/stores/modelStore";
import useAuthStore from "@/shared/stores/authStore";
import { getModelData, deleteModel } from "@/modules/models/services/modelService";
import { Model } from "@/shared/types";
import { Pencil, Plus, Trash } from "lucide-react";
import ModelsDialog from "./modelsDialog";

interface ModelsTableProps {
    brands: { id: string; name: string }[];
}

export default function ModelsTable({ brands }: ModelsTableProps) {
    const { models, setModels, brandId, setBrandId } = useModelStore();
    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState<Model | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchModels = useCallback(async (brandId: string) => {
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
    }, [token, setModels]);


    useEffect(() => {
        if (brands.length > 0) {
            setBrandId(brands[0].id);
            fetchModels(brands[0].id);
        }
    }, [brands, fetchModels, setBrandId]);

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

    const deleteModelHandler = async (id: string) => {
        if (!token) return;

        try {
            await deleteModel(token, id);
            setModels(models.filter((m) => m.id !== id));
        } catch (err) {
            console.error("Failed to delete model:", err);
        }
    }

    const handleSave = (model: Model) => {
        if (selectedModel) {
            setModels(models.map(m => m.id === model.id ? model : m));
        } else {
            setModels([...models, model]);
        }
    };

    return (
        <div className="mt-12">
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

                <Button className="bg-primary" onClick={handleAdd}>
                    <Plus className="mr-2 h-5 w-5" /> Dodaj Model
                </Button>
            </div>

            {isLoading ? (
                <p>Loading models...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="overflow-hidden rounded-lg border border-[#3b3b3b]">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#1e1e1e] hover:bg-transparent border-[#3b3b3b]">
                                <TableHead className="font-semibold text-white py-3">Model</TableHead>
                                <TableHead className="flex justify-end font-semibold text-white py-3">Akcje</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {models.map((model) => (
                                <TableRow key={model.id} className="hover:bg-[#0b0b0b] border-[#3b3b3b]">
                                    <TableCell>{model.name}</TableCell>
                                    <TableCell className="flex justify-end space-x-2">
                                        <Pencil className="h-5 w-5 cursor-pointer text-primary hover:text-[#895432]"
                                            onClick={() => handleEdit(model)} />
                                        {user?.roles.includes("Admin") && (
                                            <Trash
                                                className="h-5 w-5 cursor-pointer text-red-500 hover:text-red-700"
                                                onClick={() => deleteModelHandler(model.id)}
                                            />
                                        )}
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
