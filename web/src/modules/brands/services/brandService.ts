import httpClient from "@/shared/tools/axiosInstance";

export const getBrandData = async (token: string) => {
    const response = await httpClient.get('/brand?sorts=name', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const createBrand = async (token: string, name: string) => {
    const response = await httpClient.post('/brand', { name }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

