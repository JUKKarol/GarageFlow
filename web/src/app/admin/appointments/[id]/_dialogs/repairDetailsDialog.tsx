import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRepairDetailsStore } from "@/shared/stores/repairDetailsStore"
import useAuthStore from "@/shared/stores/authStore"
import type { RepairDetails } from "@/shared/types"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createRepairDetails } from "@/modules/repair-details/services/repair-detailsService"

interface RepairDetailsDialogProps {
    repairId: string;
    isOpen: boolean;
    onClose: () => void;
}

const INITIAL_REPAIR_DETAIL: RepairDetails = {
    id: "",
    name: "",
    repairId: "",
    price: 0,
    repairDetailType: 1
};

export function RepairDetailsDialog({ repairId, isOpen, onClose }: RepairDetailsDialogProps) {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const token = useAuthStore.getState().token;
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    
    const { 
        singleRepairDetail, 
        setSingleRepairDetail, 
        addRepairDetail 
    } = useRepairDetailsStore();

    useEffect(() => {
        if (isOpen) {
            setSingleRepairDetail({ 
                ...INITIAL_REPAIR_DETAIL, 
                repairId 
            });
        }
    }, [isOpen, repairId, setSingleRepairDetail]);

    const handleSubmit = async () => {
        if (!token || !isAuthenticated) {
            router.push('/login');
            return;
        }

        if (!singleRepairDetail?.name || !singleRepairDetail?.price) {
            setError("Please fill in all required fields");
            return;
        }

        try {
            const response = await createRepairDetails(token, singleRepairDetail);
            addRepairDetail(response);
            setError(null);
            onClose();
        } catch (error) {
            console.error("Failed to create repair details:", error);
            setError("Failed to create repair details. Please try again.");
        }
    }

    const handleInputChange = (
        field: keyof RepairDetails,
        value: string | number
    ) => {
        if (!singleRepairDetail) return;

        setSingleRepairDetail({
            ...singleRepairDetail,
            [field]: field === 'price' ? Number(value) : value
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="text-white bg-zinc-950">
                <DialogHeader>
                    <DialogTitle>Dodaj nową usługę lub część</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nazwa</Label>
                        <Input
                            id="name"
                            name="name"
                            value={singleRepairDetail?.name ?? ""}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Nazwa usługi lub części"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="price">Cena</Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            value={singleRepairDetail?.price ?? 0}
                            onChange={(e) => handleInputChange("price", e.target.value)}
                            placeholder="0.00"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="type">Typ</Label>
                        <Select
                            value={String(singleRepairDetail?.repairDetailType)}
                            onValueChange={(value) => 
                                handleInputChange("repairDetailType", parseInt(value))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Wybierz typ" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Usługa</SelectItem>
                                <SelectItem value="2">Część</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Anuluj
                        </Button>
                        <Button onClick={handleSubmit}>
                            Zapisz
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}