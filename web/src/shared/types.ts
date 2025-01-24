export interface User {
    userId: string;
    userName: string;
    email: string;
    emailConfirmed: boolean;
    phoneNumber?: string;
    roles: string[];
}

export interface Brand {
    id: string;
    name: string;
}

export interface Model {
    id: string;
    name: string;
}

export interface Appointment {
    id?: string;
    creadtedAt?: string;
    updatedAt?: string;
    startedAt?: string;
    finishedAt?: string;
    plannedStartAt: string;
    plannedFinishAt: string;
    description: string;
    customerName: string;
    customerPhoneNumber: string;
    customerEmail: string;
    price?: number;
    carId?: string;
    status?: number;
    users?: string[];
}