import httpClient from "@/shared/tools/axiosInstance";
import { Appointment } from "@/shared/types";

export const getAppointments = async (token: string) => {
    const response = await httpClient.get('/repair', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const getAppointemtsByWeek = async (token: string, weekStartDate: string, weekEndDate: string) => {
    const response = await httpClient.get(`/repair?filters=plannedStartAt>=${weekStartDate},plannedStartAt<=${weekEndDate}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;

};

export const getAppointment = async (token: string, id: string) => {
    const response = await httpClient.get(`/repair/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const createAppointment = async (token: string, data: Appointment) => {
    const response = await httpClient.post('/repair', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const updateAppointment = async (token: string, data: Appointment) => {
    const response = await httpClient.patch(`/repair`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};