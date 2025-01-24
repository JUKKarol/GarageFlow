'use client'

import { useState, useEffect } from "react"
import { PenToolIcon as Tools, Wrench } from "lucide-react"
import { use } from "react"
import { useRouter } from "next/navigation"
import { getAppointment } from "@/modules/appointments/services/appointmentsService"
import useAuthStore from "@/shared/stores/authStore"
import { useAppointmentStore } from '@/shared/stores/appointmentsStore';
import Header from "@/app/_components/dashboard/header"
import { Badge } from "@/components/ui/badge"
import CustomerCard from "./customerCard"
import CarCard from "./carCard"
import DetailsCard from "./detailsCard"



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

        return () => unsubscribe();
    }, []);

    if (!storeToken || !storeIsAuthenticated) {
        router.push('/login')
        return null;
    }


    useEffect(() => {
        const fetchAppointment = async () => {
            // Check both token and isAuthenticated
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
    }, [token, isAuthenticated, id, router, setAppointment])

    if (isLoading) {
        return <div>Ładowanie...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className="text-white">
            {appointment ? (
                <div>
                    <Header title="Szczegóły wizyty">
                        <Badge className="text-lg">Zaplanowana</Badge>
                    </Header>

                    <div className="grid gap-6 md:grid-cols-2 mb-6">
                        <CustomerCard 
                            customerName={appointment.customerName} 
                            customerPhoneNumber={appointment.customerPhoneNumber} 
                            customerEmail={appointment.customerEmail} 
                        />
                        <CarCard />
                    </div>
                    <DetailsCard plannedStartAt={appointment.plannedStartAt} plannedFinishAt={appointment.plannedFinishAt} description={appointment.description} />
                </div>

            ) : (
                <div>Nie znaleziono wizyty</div>
            )}
        </div>
    )
}