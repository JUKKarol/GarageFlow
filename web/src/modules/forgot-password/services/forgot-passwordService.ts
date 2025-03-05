import httpClient from "@/shared/tools/axiosInstance";

export const postForgotPassword = async (email: string) => {
    const response = await httpClient.post('/auth/forgotPassword', { email });

    return response.data;
}

export const postResetPassword = async (email: string, resetCode: string, newPassword: string) => {
    const response = await httpClient.post('/auth/resetPassword', { email, resetCode, newPassword });

    return response.data;
}