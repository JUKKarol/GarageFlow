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
import Link from "next/link";


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

  const weekStart = useMemo(() => startOfWeek(currentWeek, { weekStartsOn: 1 }), [currentWeek]);
  const weekEnd = useMemo(() => endOfWeek(currentWeek, { weekStartsOn: 1 }), [currentWeek]);

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
  }, [token, currentWeek, setAppointments, formatDate, weekStart, weekEnd]);

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
              <Button variant="secondary" className="w-10 px-0 pl-0">
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

      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {/* Time column lines */}
        <div className="absolute inset-0 grid grid-rows-12 pointer-events-none">

        </div>

        {weekDays.map((date) => (
          <div
            key={date.toISOString()}
            className="relative p-2 min-h-[600px] rounded-md text-white border border-[#191919] bg-foreground"
          >
            <div className="text-center text-sm font-semibold capitalize mb-4 py-2 rounded-t-md">
              {format(date, 'EEEE', { locale: pl })}
              <div className="text-sm font-normal">
                {format(date, 'dd', { locale: pl })}
              </div>
            </div>

            {/* Hour markers */}
            <div className="absolute left-0 top-12 bottom-0 w-12 text-xs text-gray-500 pointer-events-none">

            </div>

            <div className="mt-2 space-y-1 relative">
              {appointments
                .filter((appointment) => isSameDay(parseISO(appointment.plannedStartAt), date))
                .map((appointment) => {
                  const status = statuses.find(status => status.id === appointment.repairHistory?.status);

                  return (
                    <Link href={`/admin/appointments/${appointment.id}`} key={appointment.id}>
                      <div
                        className={`${status?.color} ${status?.hoverColor} ${status?.textColor} p-1 rounded-md transition duration-200 mb-2`}
                      >
                        {appointment.customerName} - {appointment.description}
                      </div>
                    </Link>
                  );
                })}
              {appointments.filter((appointment) => isSameDay(parseISO(appointment.plannedStartAt), date)).length === 0 && (
                <p className='text-center text-gray-500'>Brak wizyt</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <CreateAppointmentDialog />
    </MainContainer>
  );
}