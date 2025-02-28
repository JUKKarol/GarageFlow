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
import { ModelSchema } from "@/shared/schemas/model.schema";
import { validateWithZod } from "@/shared/tools/validation";

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
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (model) {
            setName(model.name);
        }
        setErrors({});
    }, [model]);

    const handleSubmit = async () => {

        if (!token) {
            setErrors({ form: "Nie jesteś zalogowany." });
            return;
        }

        const formData = { name };
        const { isValid, errors: validationErrors } = validateWithZod(ModelSchema, formData);

        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

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
            setErrors({ form: "Nie udało się zapisać modelu. Spróbuj ponownie." });
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
                    {loading ? "Zapisywanie..." : model ? "Zapisz zmiany" : "Dodaj"}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    );
}
