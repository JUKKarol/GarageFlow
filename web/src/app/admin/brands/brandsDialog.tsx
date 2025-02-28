import React, { useEffect, useState } from "react";
import { z } from "zod";
import {
    Dialog,
    DialogFooter,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useBrandStore from "@/shared/stores/brandStore";
import useAuthStore from "@/shared/stores/authStore";
import { createBrand, updateBrand } from "@/modules/brands/services/brandService";
import { Brand } from "@/shared/types";
import { BrandSchema } from "@/shared/schemas/brand.schema";
import { validateWithZod } from "@/shared/tools/validation";


interface BrandDialogProps {
    brand?: Brand | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function BrandDialog({ brand, isOpen, onClose }: BrandDialogProps) {
    const { brands, setBrands } = useBrandStore();
    const token = useAuthStore((state) => state.token);
    const [name, setName] = useState(brand?.name || "");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        setName(brand?.name || "");
        setErrors({});
    }, [brand]);



    const handleSubmit = async () => {


        if (!token) {
            setErrors({ form: "Nie jesteś zalogowany" });
            return;
        }

        const formData = { name };
        const { isValid, errors: validationErrors } = validateWithZod(BrandSchema, formData);

        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {
            if (brand) {
                await updateBrand(token, brand.id, name);
                setBrands(brands.map((b) => (b.id === brand.id ? { ...b, name } : b)));
            } else {
                const newBrand = await createBrand(token, name);
                setBrands([...brands, newBrand]);
            }
            onClose();
        } catch (err) {
            console.error("Błąd podczas zapisywania marki:", err);
            setErrors({ form: "Nie udało się zapisać marki. Spróbuj ponownie." });
        } finally {
            setLoading(false);
        }
    };

    return (
<Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] text-white bg-zinc-950">
                <DialogHeader>
                    <DialogTitle>{brand ? "Edytuj markę" : "Dodaj markę"}</DialogTitle>
                    <DialogDescription>
                        {brand ? "Zmień informacje o marce." : "Wypełnij dane, aby dodać nową markę."}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label>Nazwa marki</Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                            className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    {errors.form && <p className="text-red-500">{errors.form}</p>}
                </div>

                <DialogFooter>
                    <Button variant="secondary" onClick={onClose} disabled={loading}>
                        Anuluj
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Zapisywanie..." : brand ? "Zapisz zmiany" : "Dodaj"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
