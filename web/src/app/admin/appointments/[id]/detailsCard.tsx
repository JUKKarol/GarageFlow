import { CalendarDays, Clock } from "lucide-react";
import AppointmentCard from "./_cards/appointmentCard";

interface AppointmentCardProps {
    plannedStartAt: string;
    plannedFinishAt: string;
    description: string;
}

export default function DetailsCard({ plannedStartAt, plannedFinishAt, description }: AppointmentCardProps) {
    return (
        <AppointmentCard title="Termin i opis" icon={CalendarDays}>
                <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    <div>
                        <div className="text-sm">Data</div>
                        <span className="font-semibold">{plannedStartAt}</span>
                    </div>
                </div>
        </AppointmentCard>
    )
}