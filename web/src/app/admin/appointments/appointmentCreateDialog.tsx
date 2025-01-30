'use client'

import React, { useState, useEffect } from 'react'
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
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Plus, Calendar as CalendarIcon } from 'lucide-react'
import { createAppointment } from '@/modules/appointments/services/appointmentsService'
import useAuthStore from '@/shared/stores/authStore'
import { useAppointmentStore } from '@/shared/stores/appointmentsStore'
import { Appointment } from '@/shared/types'

const INITIAL_APPOINTMENT: Required<Pick<Appointment, 'plannedStartAt' | 'plannedFinishAt' | 'description' | 'customerName' | 'customerPhoneNumber' | 'customerEmail'>> = {
    plannedStartAt: format(new Date(), 'yyyy-MM-dd'),
    plannedFinishAt: format(new Date(), 'yyyy-MM-dd'),
    description: '',
    customerName: '',
    customerPhoneNumber: '',
    customerEmail: ''
}

export function CreateAppointmentDialog() {
    const token = useAuthStore((state) => state.token)
    const [dialogOpen, setDialogOpen] = useState(false)
    const { newAppointment, setNewAppointment, appointments } = useAppointmentStore()

    useEffect(() => {
        if (dialogOpen && !newAppointment) {
            setNewAppointment(INITIAL_APPOINTMENT)
        }
    }, [dialogOpen, setNewAppointment, newAppointment])

    const handleDateChange = (
        field: 'plannedStartAt' | 'plannedFinishAt',
        date: Date | undefined
    ) => {
        if (!newAppointment || !date) return

        setNewAppointment({
            ...newAppointment,
            [field]: format(date, 'yyyy-MM-dd')
        })
    }

    const handleInputChange = (
        field: keyof typeof INITIAL_APPOINTMENT,
        value: string,
    ) => {
        if (!newAppointment) return

        setNewAppointment({
            ...newAppointment,
            [field]: value,
        } as typeof INITIAL_APPOINTMENT)
    }

    const resetForm = () => {
        setNewAppointment(INITIAL_APPOINTMENT)
    }

    const handleSubmitAppointment = async () => {
        try {
            if (!token || !newAppointment) {
                console.error('No authentication token found or appointment data missing')
                return
            }

            const response = await createAppointment(token, {
                ...newAppointment,
                plannedStartAt: newAppointment.plannedStartAt,
                plannedFinishAt: newAppointment.plannedFinishAt
            })
            
            appointments.push(response)
            setDialogOpen(false)
            resetForm()
        } catch (error) {
            console.error('Failed to create appointment', error)
        }
    }

    const handleClose = () => {
        setDialogOpen(false)
        resetForm()
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button className="fixed bottom-4 right-4">
                    <Plus className="mr-2 h-4 w-4" /> Dodaj wizytę
                </Button>
            </DialogTrigger>
            <DialogContent className="text-white bg-foreground border-zinc-800">
                <DialogHeader>
                    <DialogTitle>Dodaj nową wizytę</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="startDate" className="text-right">
                            Termin wizyty
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "col-span-3 justify-start text-left font-normal border-zinc-500 hover:bg-zinc-800 hover:text-white",
                                        !newAppointment?.plannedStartAt && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {newAppointment?.plannedStartAt ? (
                                        format(new Date(newAppointment.plannedStartAt), 'PPP')
                                    ) : (
                                        <span>Wybierz datę</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={newAppointment?.plannedStartAt ? new Date(newAppointment.plannedStartAt) : undefined}
                                    onSelect={(date) => handleDateChange('plannedStartAt', date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="finishDate" className="text-right">
                            Planowana data zakończenia
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "col-span-3 justify-start text-left font-normal border-zinc-500 hover:bg-zinc-800 hover:text-white",
                                        !newAppointment?.plannedFinishAt && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {newAppointment?.plannedFinishAt ? (
                                        format(new Date(newAppointment.plannedFinishAt), 'PPP')
                                    ) : (
                                        <span>Wybierz datę</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={newAppointment?.plannedFinishAt ? new Date(newAppointment.plannedFinishAt) : undefined}
                                    onSelect={(date) => handleDateChange('plannedFinishAt', date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="customerName" className="text-right">
                            Imię klienta
                        </Label>
                        <Input
                            id="customerName"
                            value={newAppointment?.customerName || ''}
                            onChange={(e) => handleInputChange('customerName', e.target.value)}
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
                            value={newAppointment?.customerPhoneNumber || ''}
                            onChange={(e) => handleInputChange('customerPhoneNumber', e.target.value)}
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
                            value={newAppointment?.customerEmail || ''}
                            onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Opis
                        </Label>
                        <Input
                            id="description"
                            value={newAppointment?.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button
                        variant="secondary"
                        onClick={handleClose}
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