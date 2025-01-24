'use client'

import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import Header from "@/app/_components/dashboard/header";
import MainContainer from '@/app/_components/dashboard/mainContainer';
import { useAppointmentStore } from '@/shared/stores/appointmentsStore';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, parseISO, isSameDay } from 'date-fns';
import { pl } from 'date-fns/locale';
import { getAppointemtsByWeek } from '@/modules/appointments/services/appointmentsService';
import useAuthStore from '@/shared/stores/authStore';
import { CreateAppointmentDialog } from './appointmentCreateDialog';
import StatusesLegend from './statusesLegend';
import { statuses } from '@/shared/statues';

export default function AppointmentsPage() {
  const token = useAuthStore((state) => state.token);
  const {
    selectedDate,
    setSelectedDate,
    appointments,
    setAppointments,
    formatDate
  } = useAppointmentStore();
  const [currentWeek, setCurrentWeek] = useState(selectedDate);

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });

  useEffect(() => {
    const fetchAppointments = async () => {
      if (token) {
        try {
          const weekStartDate = formatDate(weekStart);
          const weekEndDate = formatDate(weekEnd);
          const data = await getAppointemtsByWeek(token, weekStartDate, weekEndDate);
          setAppointments(data.items);
        } catch (error) {
          console.error("Failed to fetch appointments:", error);
        }
      }
    };
    fetchAppointments();
  }, [token, currentWeek, setAppointments]);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      return date;
    });
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

  return (
    <MainContainer>
      <Header title="Wizyty" />

      <StatusesLegend />

      {/* Week Navigation */}

      <div className="flex items-center justify-between my-4">
        <Button variant="ghost" onClick={handlePreviousWeek}>
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="flex items-center space-x-4">
          <span className="font-semibold">
            {format(weekStart, 'dd MMM', { locale: pl })} - {format(weekEnd, 'dd MMM yyyy', { locale: pl })}
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

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {weekDays.map((date) => (
          <div
            key={date.toISOString()}
            className="border p-2 min-h-[100px] rounded-md bg-zinc-800 text-white"
          >
            {/* Day Name and Number */}
            <div className="text-center text-sm font-semibold">
              {format(date, 'EEEE', { locale: pl })}
            </div>
            <div className="text-center text-sm">
              {format(date, 'dd', { locale: pl })}
            </div>

            {/* Display Appointments for This Day */}
            <div className="mt-2 space-y-1">
              {appointments
                .filter((appointment) => isSameDay(parseISO(appointment.plannedStartAt), date))
                .map((appointment) => (
                  <div key={appointment.id} className={ `text-xs p-1 rounded-md ${statuses.find(status => status.id === appointment.status)?.color}` }>
                    {appointment.customerName} - {appointment.description}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>


      <CreateAppointmentDialog />
    </MainContainer>
  );
}
