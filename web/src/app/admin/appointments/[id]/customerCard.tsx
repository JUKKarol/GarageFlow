import { User } from "lucide-react";
import AppointmentCard from "./_cards/appointmentCard";

interface CustomerCardProps {
    customerName: string;
    customerPhoneNumber: string;
    customerEmail: string;
}

export default function CustomerCard({ customerName, customerEmail, customerPhoneNumber }: CustomerCardProps) {
    return (
        <AppointmentCard title="Informacje o kliencie" icon={User}>
            <p className="text-lg font-semibold">{customerName}</p>
            <p>{customerPhoneNumber}</p>
            <p>{customerEmail}</p>
        </AppointmentCard>
    )
}