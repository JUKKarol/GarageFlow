import httpClient from "@/shared/tools/axiosInstance";

export const getModelData = async (token: string, brandId: string) => {
    const response = await httpClient.get(`/model?brandId=${brandId}`, {
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