'use client';

import React, { useEffect, useState } from "react";
import Header from "@/app/_components/dashboard/header";
import MainContainer from "@/app/_components/dashboard/mainContainer";
import { Button } from "@/components/ui/button";
import useBrandStore from "@/shared/stores/brandStore";
import useAuthStore from "@/shared/stores/authStore";
import { getBrandData } from "@/modules/brands/services/brandService";
import BrandDialog from "./brandsDialog";
import BrandsTable from "./brandsTable";
import ModelsTable from "./modelsTable";
import { Plus } from "lucide-react";

export default function BrandsPage() {
    const token = useAuthStore((state) => state.token);
    const { brands, setBrands, setEditedItem } = useBrandStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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

    return (
        <MainContainer>
            <Header title="Marki i modele" />
            <div className="flex justify-end mb-4">
                <Button
                    className="bg-primary"
                    onClick={() => setIsDialogOpen(true)}
                >
                    <Plus className="mr-2 h-5 w-5" /> Dodaj Markę
                </Button>
            </div>

            <BrandsTable brands={brands} onEdit={(brand) => setEditedItem(brand)} />

            <BrandDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />

            <ModelsTable brands={brands} />
        </MainContainer>
    );
}
