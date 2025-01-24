import { create } from 'zustand';
import { format } from 'date-fns';
import { Appointment } from '../types';

interface AppointmentState {
    newAppointment: Appointment | null;
    today: Date;
    selectedDate: Date;
    appointments: Appointment[];
    appointment: Appointment | null;
    addAppointment: (appointment: Appointment) => void;
    setNewAppointment: (appointment: Appointment | null) => void;
    setSelectedDate: (date: Date) => void;
    formatDate: (date: Date, formatString?: string) => string;
    setAppointments: (appointments: Appointment[]) => void;
    setAppointment: (appointment: Appointment | null) => void;
}

export const useAppointmentStore = create<AppointmentState>((set) => ({
    newAppointment: null, 
    today: new Date(),
    selectedDate: new Date(),
    appointments: [],
    appointment: null,
    addAppointment: (appointment) => set((state) => ({
        appointments: [...state.appointments, appointment]
    })),
    setNewAppointment: (appointment) => set({ newAppointment: appointment }),
    setSelectedDate: (date) => set({ selectedDate: date }),
    formatDate: (date, formatString = 'yyyy-MM-dd') => 
        format(date, formatString),
    setAppointments: (appointments) => set({ appointments }),
    setAppointment: (appointment) => set({ appointment }),
}));