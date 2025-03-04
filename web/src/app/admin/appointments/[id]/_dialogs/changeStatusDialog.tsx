import { Appointment } from "@/shared/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import useAuthStore from "@/shared/stores/authStore";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateAppointment } from "@/modules/appointments/services/appointmentsService";
import { statuses } from "@/shared/statues";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectValue, SelectLabel, SelectItem } from "@/components/ui/select"

interface ChangeStatusDialogProps {
    appointment: Appointment;
}

export default function ChangeStatusDialog({ appointment }: ChangeStatusDialogProps) {
    const [error, setError] = useState("");
    const [editedAppointment, setEditedAppointment] = useState(appointment);
    const [selectedStatus, setSelectedStatus] = useState<number>(appointment.status || 1); 
    const router = useRouter();
    const token = useAuthStore.getState().token;
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    const [open, setOpen] = useState(false);

    const handleStatusChange = (statusId: number) => {
        const newStatus = Number(statusId);
        setSelectedStatus(newStatus);
        setEditedAppointment((prevAppointment) => ({
            ...prevAppointment,
            status: newStatus, 
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!token || !isAuthenticated) {
                router.push('/login');
                return;
            }

            delete editedAppointment.repairHistory;
            await updateAppointment(token, editedAppointment);
            setOpen(false);
        } catch (error) {
            console.error("Failed to update appointment:", error);
            setError("Failed to update appointment");
        } finally {
            window.location.reload();
        }
    };

    useEffect(() => {
        if (open) {
            setEditedAppointment({
                ...appointment,
            });
            setSelectedStatus(appointment.status || 1); 
        }
    }, [open, appointment]);

    return (
        <>
        <Button onClick={() => setOpen(true)} className="bg-primary text-white">Zmień status</Button>
        <Dialog open={open} onOpenChange={() => {  setOpen(false); }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Zmiana statusu</DialogTitle>
                </DialogHeader>
                <div className="mb-4">
                    <label htmlFor="status" className="text-sm font-medium">Status naprawy</label>
                    <Select 
                        value={selectedStatus.toString()} 
                        onValueChange={(value) => handleStatusChange(Number(value))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Wybierz status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Statusy</SelectLabel>
                                {statuses.map((status) => (
                                    <SelectItem key={status.id} value={status.id.toString()}>
                                        {status.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {error && <div className="text-red-600">{error}</div>}
                <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Anuluj
                    </Button>
                    <Button onClick={handleSubmit}>Zmień status</Button>
                </div>
            </DialogContent>
        </Dialog>
        </>
    );
}