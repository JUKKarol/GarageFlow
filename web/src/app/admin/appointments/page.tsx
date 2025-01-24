'use client'

import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from "@/app/_components/dashboard/header";
import { useAppointmentStore } from '@/shared/stores/appointmentsStore';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks } from 'date-fns';
import { pl } from 'date-fns/locale';
import { createAppointment, getAppointments } from '@/modules/appointments/services/appointmentsService';
import useAuthStore from '@/shared/stores/authStore';

export default function AppointmentsPage() {
  const token = useAuthStore((state) => state.token);
  const {
    selectedDate,
    setSelectedDate,
    addAppointment,
    appointments,
    newAppointment,
    setNewAppointment,
    setAppointments
  } = useAppointmentStore();
  const [currentWeek, setCurrentWeek] = useState(selectedDate);
  const [dialogOpen, setDialogOpen] = useState(false);


    useEffect(() => {
        const fetchBrands = async () => {
            if (token) {
                try {
                    const data = await getAppointments(token);
                    setAppointments(data.items);
                } catch (error) {
                    console.error("Failed to fetch brands:", error);
                }
            }
        };
        fetchBrands();
    }, [token, setAppointments]);

  // Week calculation logic (previous implementation)
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });

  const weekDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      days.push(date);
    }
    return days;
  }, [weekStart]);

  const handlePreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setCurrentWeek(selectedDate);
      setSelectedDate(selectedDate);
    }
  };

  const handleSubmitAppointment = async () => {
    try {
      // Assuming you have a way to get the token, e.g., from an auth context or store
      const token = localStorage.getItem('token'); // Adjust this based on your auth method



      if (!token) {
        // Handle case where token is not available
        console.error('No authentication token found');
        return;
      }

      // Call the API to create the appointment
      if (newAppointment) {
        const formattedDate = format(newAppointment.plannedStartAt, 'yyyy-MM-dd');
        const formatteFinishDate = format(newAppointment.plannedFinishAt, 'yyyy-MM-dd');
        await createAppointment(token, {
          ...newAppointment,
          plannedStartAt: formattedDate,
          plannedFinishAt: formatteFinishDate
        });
      } else {
        console.error('New appointment data is null');
      }

      // Add to local store

      setDialogOpen(false);
      // Reset form
      if (newAppointment) {
        appointments.push(newAppointment);
      }
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
      // Optionally add error handling UI
    }
  };

  return (
    <div className="text-white p-4 space-y-6">
      <Header title="Wizyty" />

      <div className="flex items-center justify-between my-4">
        <Button variant="ghost" onClick={handlePreviousWeek}>
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="flex items-center space-x-4">
          <span className="font-semibold">
            {format(weekStart, 'dd MMM', { locale: pl })} -
            {format(weekEnd, 'dd MMM yyyy', { locale: pl })}
          </span>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-10 px-0 pl-0">
                <Calendar className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={currentWeek}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button variant="ghost" onClick={handleNextWeek}>
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Week view grid */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div
            key={day.toISOString()}
            className="border border-gray-700 p-2 min-h-[200px]"
          >
            <div className="font-semibold mb-2">
              {format(day, 'EEE dd', { locale: pl })}
            </div>
            {/* Appointments will be rendered here later */}
          </div>
        ))}
      </div>

      {/* Add Appointment Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="fixed bottom-4 right-4">
            <Plus className="mr-2 h-4 w-4" /> Dodaj wizytę
          </Button>
        </DialogTrigger>
        <DialogContent>
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
              variant="outline"
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
    </div>
  );
}