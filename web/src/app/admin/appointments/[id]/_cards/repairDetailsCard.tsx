'use client'

import AppointmentCard from "./appointmentCard";
import { CalendarDays } from "lucide-react";
import { useRepairDetailsStore } from "@/shared/stores/repairDetailsStore";
import useAuthStore from "@/shared/stores/authStore";
import { useEffect, useState } from "react";
import router from "next/router";
import { getRepairDetailsData } from "@/modules/repair-details/services/repair-detailsService";
import { RepairDetailsDialog } from "../_dialogs/repairDetailsDialog";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react'


interface RepairUpdateCardProps {
    repairId: string;
    status: number;
    carId: string;
}

const token = useAuthStore.getState().token;
const isAuthenticated = useAuthStore.getState().isAuthenticated;

export default function RepairUpdateCard({ repairId, status, carId }: RepairUpdateCardProps) {
    const { repairDetails, setRepairDetails } = useRepairDetailsStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    useEffect(() => {
        const fetchRepairDetails = async () => {
            if (!token || !isAuthenticated) {
                router.push('/login');
                return;
            }

            try {
                const data = await getRepairDetailsData(token, repairId);
                setRepairDetails(data);

            } catch (error) {
                console.log("Fetch repair details error:", error);
            } 
        };
        fetchRepairDetails();
        
    }, [repairId, setRepairDetails]);

    return (
        <div className="mt-4">
            {status !== 4 && carId  && <Button className="mb-4" onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Dodaj usługę
            </Button>}

            <RepairDetailsDialog
                repairId={repairId}
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
            <AppointmentCard title="Zastosowane części i usługi" icon={CalendarDays}>
                <div>
                    {repairDetails.length === 0 ? (
                        <p>Brak zastosowanych części i usług.</p>
                    ) : (
                        <div>
                            {repairDetails.map((repairDetail) => (
                                <div key={repairDetail.id}>
                                    <div className="flex justify-between">
                                        <div>
                                            <div className="text-sm">{repairDetail.name}</div>
                                            <span className="font-semibold">{repairDetail.price} zł</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </AppointmentCard>
        </div>

    )
}