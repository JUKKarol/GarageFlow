'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import { format } from 'date-fns'
import { createAppointment } from '@/modules/appointments/services/appointmentsService'
import useAuthStore from '@/shared/stores/authStore'
import { useAppointmentStore } from '@/shared/stores/appointmentsStore'

export function CreateAppointmentDialog() {
    const token = useAuthStore((state) => state.token);
    const [dialogOpen, setDialogOpen] = useState(false)


    const { newAppointment, setNewAppointment, appointments } = useAppointmentStore()

    const handleSubmitAppointment = async () => {
        try {


            if (!token) {
                console.error('No authentication token found');
                return;
            }

            if (newAppointment) {
                const formattedDate = format(newAppointment.plannedStartAt, 'yyyy-MM-dd');
                const formatteFinishDate = format(newAppointment.plannedFinishAt, 'yyyy-MM-dd');
                const response = await createAppointment(token, {
                    ...newAppointment,
                    plannedStartAt: formattedDate,
                    plannedFinishAt: formatteFinishDate
                });
                appointments.push(response);
            } else {
                console.error('New appointment data is null');
            }

            setDialogOpen(false);

            setNewAppointment({
                plannedStartAt: '',
                plannedFinishAt: '',
                description: '',
                customerName: '',
                customerPhoneNumber: '',
                customerEmail: ''
            });

        } catch (error) {
            console.error('Failed to create appointment', error);

        }
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button className="fixed bottom-4 right-4">
                    <Plus className="mr-2 h-4 w-4" /> Dodaj wizytę
                </Button>
            </DialogTrigger>
            <DialogContent className="text-white bg-zinc-950">
                <DialogHeader>
                    <DialogTitle>Dodaj nową wizytę</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                            Data
                        </Label>
                        <Input
                            id="date"
                            type="date"
                            value={newAppointment?.plannedStartAt
                                ? format(newAppointment.plannedStartAt, 'yyyy-MM-dd')
                                : ''}
                            onChange={(e) => setNewAppointment({
                                ...newAppointment,
                                plannedStartAt: new Date(e.target.value)
                            })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                            Data
                        </Label>
                        <Input
                            id="date"
                            type="date"
                            value={newAppointment?.plannedFinishAt
                                ? format(newAppointment.plannedFinishAt, 'yyyy-MM-dd')
                                : ''}
                            onChange={(e) => setNewAppointment({
                                ...newAppointment,
                                plannedFinishAt: new Date(e.target.value)
                            })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="customerName" className="text-right">
                            Imię klienta
                        </Label>
                        <Input
                            id="customerName"
                            value={newAppointment?.customerName}
                            onChange={(e) => setNewAppointment({
                                ...newAppointment,
                                customerName: e.target.value
                            })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="customerPhoneNumber" className="text-right">
                            Numer telefonu
                        </Label>
                        <Input
                            id="customerPhoneNumber"
                            type="tel"
                            value={newAppointment?.customerPhoneNumber}
                            onChange={(e) => setNewAppointment({
                                ...newAppointment,
                                customerPhoneNumber: e.target.value
                            })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="customerEmail" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="customerEmail"
                            type="email"
                            value={newAppointment?.customerEmail}
                            onChange={(e) => setNewAppointment({
                                ...newAppointment,
                                customerEmail: e.target.value
                            })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Opis
                        </Label>
                        <Input
                            id="description"
                            value={newAppointment?.description}
                            onChange={(e) => setNewAppointment({
                                ...newAppointment,
                                description: e.target.value
                            })}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button
                        variant="secondary"
                        onClick={() => setDialogOpen(false)}
                    >
                        Anuluj
                    </Button>
                    <Button onClick={handleSubmitAppointment}>
                        Dodaj wizytę
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}