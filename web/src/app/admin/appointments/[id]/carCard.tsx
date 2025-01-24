import { Car } from "lucide-react";
import AppointmentCard from "./_cards/appointmentCard";

export default function CarCard() {
    return (
        <AppointmentCard title="Informacje o pojeździe" icon={Car}>
            <p className="text-lg font-semibold">Audi A4</p>
            <p>2019</p>
            <p>1.8 TFSI</p>
            <p>123456789</p>
        </AppointmentCard>
    )
}