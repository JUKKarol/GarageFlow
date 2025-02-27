import httpClient from "@/shared/tools/axiosInstance";
import { Car } from "@/shared/types";

export const getCarData = async (token: string) => {
    const response = await httpClient.get("/car?sorts=registrationNumber", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const createCar = async (token: string, data: Car) => {
    const response = await httpClient.post("/car", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export const updateCar = async (token: string, data: Car) => {
    const response = await httpClient.patch("/car", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },

    });

    return response.data;
}

export const getCar = async (token: string, id: string) => {
    const response = await httpClient.get(`/car?filters=id==${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;

}