import httpClient from "@/shared/tools/axiosInstance";

export const getRepairDetailsData = async (token: string, repairId: string) => {
    const response = await httpClient.get(`/RepairDetails/${repairId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export const createRepairDetails = async (token: string, data: any) => {
    const response = await httpClient.post('/RepairDetails', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export const updateRepairDetails = async (token: string, data: any) => {
    const response = await httpClient.patch(`/RepairDetails`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}
