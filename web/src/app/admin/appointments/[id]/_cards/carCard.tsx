import { Car } from "lucide-react";
import AppointmentCard from "./appointmentCard";
import { Appointment } from "@/shared/types";
import AddCarDialog from "../_dialogs/addCarDialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getCar } from "@/modules/cars/services/carService";
import useAuthStore from "@/shared/stores/authStore";
import useCarStore from "@/shared/stores/carsStore";
import { useEffect } from "react";

interface CarCardProps {
    carId: string;
    appointment: Appointment;
}

export default function CarCard({ carId, appointment }: CarCardProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { token, isAuthenticated } = useAuthStore.getState();
    const { car, setCar } = useCarStore();

    const fetchCar = async () => {
        if (!token || !isAuthenticated) {
            return;
        }

        try {
            const data = await getCar(token, carId);
            setCar(data.items[0]);

        } catch (error) {
            console.log("Fetch car error:", error);
        }
    }

    useEffect(() => {
        if (carId) {
            fetchCar();
        }
    }, [token, isAuthenticated, carId]);

    return (
        <AppointmentCard title="Informacje o pojeździe" icon={Car}>
            {car ? (
                <div className="w-full">
                    <div className="flex gap-4 w-full">
                        <p className="font-semibold">Rok produkcji</p>
                        <p>{car.yearOfProduction} cm3</p>
                    </div>
                    <div className="flex gap-4">
                        <p className="font-semibold">Silnik</p>
                        <p>{car.engine} cm3</p>
                    </div>
                    <div className="flex gap-4">
                        <p className="font-semibold">Rejestracja</p>
                        <p>{car.registrationNumber} </p>
                    </div>
                    <div className="flex gap-4">
                        <p className="font-semibold">VIN</p>
                        <p>{car.vin} </p>
                    </div>
                </div>
            ) : (
                <div>
                    <Button onClick={() => setIsDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Dodaj usługę
                    </Button>
                    <AddCarDialog appointment={appointment} isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)} />
                </div>
            )}
        </AppointmentCard>
    )
}