import httpClient from "@/shared/tools/axiosInstance";
import { RepairDetails } from "@/shared/types";

export const getRepairDetailsData = async (token: string, repairId: string) => {
    const response = await httpClient.get(`/RepairDetails/${repairId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export const createRepairDetails = async (token: string, data: RepairDetails) => {
    const response = await httpClient.post('/RepairDetails', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export const updateRepairDetails = async (token: string, data: RepairDetails) => {
    const response = await httpClient.patch(`/RepairDetails`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export const deleteRepairDetails = async (token: string, repairDetailsId: string) => {
    const response = await httpClient.delete(`/RepairDetails/${repairDetailsId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}
