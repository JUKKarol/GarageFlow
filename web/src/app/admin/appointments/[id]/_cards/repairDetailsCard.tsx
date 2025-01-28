'use client'

import AppointmentCard from "./appointmentCard";
import { CalendarDays } from "lucide-react";
import { useRepairDetailsStore } from "@/shared/stores/repairDetailsStore";
import useAuthStore from "@/shared/stores/authStore";
import { useEffect, useState } from "react";
import router from "next/router";
import { getRepairDetailsData } from "@/modules/repair-details/services/repair-detailsService";

interface RepairUpdateCardProps {
    repairId: string;
}

const token = useAuthStore.getState().token;
const isAuthenticated = useAuthStore.getState().isAuthenticated;

export default function RepairUpdateCard({ repairId }: RepairUpdateCardProps) {
    const { repairDetails, setRepairDetails } = useRepairDetailsStore();
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        const fetchRepairDetails = async () => {
            if (!token || !isAuthenticated) {
                router.push('/login');
                return;
            }

            try {
                setIsLoading(true);
                const data = await getRepairDetailsData(token, repairId);
                console.log("Repair details data:", data);
                setRepairDetails(data);
                
                
            } catch (error) {
                console.log("Fetch repair details error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRepairDetails();
    }, [token, isAuthenticated, repairId, router, setRepairDetails]);

    return (
        <AppointmentCard title="Zastosowane części i usługi" icon={CalendarDays}>
            <div>
                {repairDetails.length === 0 ? (
                    <p>Brak zastosowanych części i usług.</p>
                ) : (
                   <div>
                   </div>
                )}                        
            </div>
        </AppointmentCard>
    )
}