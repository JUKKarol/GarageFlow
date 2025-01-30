import httpClient from "@/shared/tools/axiosInstance";

export const getCarData = async (token: string) => {
    const response = await httpClient.get("/car?sorts=registrationNumber", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const createCar = async (token: string, data: any) => {
    const response = await httpClient.post("/car", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export const updateCar = async (token: string, data: any) => {
    const response = await httpClient.patch("/car", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },

    });

    return response.data;
}