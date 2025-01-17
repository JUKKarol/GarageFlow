import React, { useEffect, useState } from "react";
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
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setName(brand?.name || "");
    }, [brand]);

    const handleSubmit = async () => {
        if (!name.trim()) {
            setError("Nazwa marki nie może być pusta.");
            return;
        }

        if (!token) {
            setError("Nie jesteś zalogowany.");
            return;
        }

        setLoading(true);
        setError(null);

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
            setError("Nie udało się zapisać marki. Spróbuj ponownie.");
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
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
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
