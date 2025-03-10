export interface User {
    userId: string;
    userName: string;
    email: string;
    emailConfirmed: boolean;
    phoneNumber?: string;
    roles: string[];
}

export interface Employees {
    id: string;
    userName: string;
    email: string;
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

export interface Car {
    id: string;
    fuelType: number;
    registrationNumber: string;
    vin: string;
    modelId: string;
    yearOfProduction: number;
    engine: string;
}

export interface Appointment {
    id?: string;
    startedAt?: string;
    finishedAt?: string;
    createdAt?: string;
    plannedStartAt: string;
    plannedFinishAt: string;
    description: string;
    customerName: string;
    customerPhoneNumber: string;
    customerEmail: string;
    price?: number;
    carId?: string;
    status?: number;
    repairHistory?: RepairHistory;
    users?: string[];
}

export interface RepairHistory {
    status: number;
    createdAt: string;
}

export interface RepairDetails {
    id: string;
    name: string;
    repairId: string;
    price: number;
    repairDetailType: number;
}

export interface SearchRepair {
    createdAt: string;
    updatedAt: string;
    startedAt: string;
    finishedAt: string;
    plannedStartAt: string;
    plannedFinishAt: string;
    description: string;
    repairDetails: RepairDetails[]
    repairHistory: RepairHistory;
}
