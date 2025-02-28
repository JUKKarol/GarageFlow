import httpClient from "@/shared/tools/axiosInstance";
import { User } from "@/shared/types";

export const getUserData = async (token: string) => {
    const response = await httpClient.get("/auth/user?sorts=userName", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};