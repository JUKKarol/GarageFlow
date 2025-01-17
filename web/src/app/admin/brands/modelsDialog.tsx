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
import React, { useState, useEffect } from "react";
import useModelStore from "@/shared/stores/modelStore";
import useAuthStore from "@/shared/stores/authStore";
import { createModel, updateModel } from "@/modules/models/services/modelService";
import { Model } from "@/shared/types";

interface ModelsDialogProps {
    model?: Model | null;
    onClose: () => void;
    onSave: (model: Model) => void;
}

export default function ModelsDialog({ model, onClose, onSave }: ModelsDialogProps) {
    const { brandId } = useModelStore();
    const token = useAuthStore((state) => state.token);
    const [name, setName] = useState(model?.name || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (model) {
            setName(model.name);
        }
    }, [model]);

    const handleSubmit = async () => {
        if (!name.trim()) {
            setError("Nazwa modelu nie może być pusta.");
            return;
        }

        if (!token) {
            setError("Nie jesteś zalogowany.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (model) {
                await updateModel(token, model.id, name);
                onSave({ ...model, name });
            } else if (brandId) {
                const newModel = await createModel(token, name, brandId);
                onSave(newModel);
            }
            onClose();
        } catch (err) {
            console.error("Błąd podczas zapisywania modelu:", err);
            setError("Nie udało się zapisać modelu. Spróbuj ponownie.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] text-white bg-zinc-950">
                <DialogHeader>
                    <DialogTitle>{model ? "Edytuj model" : "Dodaj model"}</DialogTitle>
                    <DialogDescription>
                        {model ? "Zmień informacje o modelu." : "Wypełnij dane, aby dodać nowy model."}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label>Nazwa modelu</Label>
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
                        {loading ? "Zapisywanie..." : model ? "Zapisz zmiany" : "Dodaj"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
