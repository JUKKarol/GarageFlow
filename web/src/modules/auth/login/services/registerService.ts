import httpClient from "@/shared/tools/axiosInstance";


export const register = async (email: string, password: string) => {
    const response = await httpClient.post('/auth/register', { email, password });

    return response;
};