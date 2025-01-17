import httpClient from "@/shared/tools/axiosInstance";

export const getModelData = async (token: string, brandId: string) => {
    const response = await httpClient.get(`/model?filters=brandId==${brandId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export const createModel = async (token: string, name: string, brandId: string) => {
    const response = await httpClient.post('/model', { name, brandId }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export const updateModel = async (token: string, id: string, name: string) => {
    const response = await httpClient.patch(`/model`, { name, id }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}