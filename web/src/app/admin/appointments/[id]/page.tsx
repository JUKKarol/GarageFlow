'use client'

import { useState, useEffect } from "react"
import { use } from "react"
import { useRouter } from "next/navigation"
import { getAppointment } from "@/modules/appointments/services/appointmentsService"
import useAuthStore from "@/shared/stores/authStore"
import { useAppointmentStore } from '@/shared/stores/appointmentsStore';
import Header from "@/app/_components/dashboard/header"
import MainContainer from "@/app/_components/dashboard/mainContainer"
import { Badge } from "@/components/ui/badge"
import CustomerCard from "./_cards/customerCard"
import CarCard from "./_cards/carCard"
import DetailsCard from "./_cards/detailsCard"
import { EditAppointmentDialog } from "./_dialogs/editRepairDailog"
import RepairUpdateCard from "./_cards/repairDetailsCard"
import { statuses } from "@/shared/statues"
import ChangeStatusDialog from "./_dialogs/changeStatusDialog"
import { InvoiceDialog } from "./_dialogs/generateInvoiceDialog"

const token = useAuthStore.getState().token;
const isAuthenticated = useAuthStore.getState().isAuthenticated;

export default function AppointmentPage({ params }: { params: Promise<{ id: string }> }) {
    const { appointment, setAppointment } = useAppointmentStore()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [storeToken, setStoreToken] = useState(token);
    const [storeIsAuthenticated, setStoreIsAuthenticated] = useState(isAuthenticated);


    const router = useRouter()
    const { id } = use(params)



    useEffect(() => {

        const unsubscribe = useAuthStore.subscribe((state) => {
            setStoreToken(state.token);
            setStoreIsAuthenticated(state.isAuthenticated);
        });

        unsubscribe();

        const fetchAppointment = async () => {

            if (!token || !isAuthenticated) {
                router.push('/login')
                return
            }

            try {
                setIsLoading(true)
                const data = await getAppointment(token, id)
                setAppointment(data)
                setError(null)
            } catch (error) {
                console.error("Fetch appointment error:", error)
                setError("Nie udało się pobrać wizyty")
                router.push('/admin/appointments')
            } finally {
                setIsLoading(false)
            }
        }

        fetchAppointment()
    }, [id, router, setAppointment])


    if (!storeToken || !storeIsAuthenticated) {
        router.push('/login')
        return null;
    }

    if (isLoading) {
        return <div>Ładowanie...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <MainContainer>
            {appointment ? (
                <div>
                    <Header title="Szczegóły wizyty">
                        {appointment.repairHistory?.status && (
                            <Badge className={`ml-6 text-lg ${statuses[appointment.repairHistory.status - 1].color} hover:${statuses[appointment.repairHistory.status - 1].color}`}>
                                {statuses[appointment.repairHistory.status - 1].name}
                            </Badge>

                        )}
                    </Header>
                    <div className="flex mb-5 gap-4">
                    <EditAppointmentDialog appointment={appointment} />
                    <ChangeStatusDialog appointment={appointment} />
                    {appointment.repairHistory?.status === 4 && <InvoiceDialog repairId={appointment.id || ''} />}
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 mb-6">
                        <CustomerCard
                            customerName={appointment.customerName}
                            customerPhoneNumber={appointment.customerPhoneNumber}
                            customerEmail={appointment.customerEmail}
                        />
                        <CarCard carId={appointment.carId ?? ''} appointment={appointment} />
                    </div>
                    <DetailsCard plannedStartAt={appointment.plannedStartAt} plannedFinishAt={appointment.plannedFinishAt} description={appointment.description} />

                    <RepairUpdateCard repairId={appointment.id ?? ''} />

                </div>

            ) : (
                <div>Nie znaleziono wizyty</div>
            )}
        </MainContainer>
    )
}