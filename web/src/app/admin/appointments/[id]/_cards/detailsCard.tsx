import { CalendarDays, Clock } from "lucide-react";
import AppointmentCard from "./appointmentCard";

interface AppointmentCardProps {
    plannedStartAt: string;
    plannedFinishAt: string;
    description: string;
}

export default function DetailsCard({ plannedStartAt, plannedFinishAt, description }: AppointmentCardProps) {
    return (
        <AppointmentCard title="Termin i opis" icon={CalendarDays}>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    <div>
                        <div className="text-sm">Data wizyty</div>
                        <span className="font-semibold">{plannedStartAt}</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    <div>
                        <div className="text-sm">Planowany koniec</div>
                        <span className="font-semibold">{plannedFinishAt}</span>
                    </div>
                </div>
            </div>
            <div>
                <div className="text-sm mt-6 font-semibold">Opis</div>
                <p>{description}</p>
            </div>
        </AppointmentCard>
    )
}