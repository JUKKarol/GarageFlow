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


