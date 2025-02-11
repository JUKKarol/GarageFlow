import httpClient from "@/shared/tools/axiosInstance";
import useAuthStore from "@/shared/stores/authStore";

const getUserData = async (token: string) => {
    const response = await httpClient.get('/auth/manage/info/full', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export const login = async (email: string, password: string) => {
    const response = await httpClient.post('/auth/login', { email, password });
    const data = response.data;

    useAuthStore.getState().setToken(data.accessToken);

    document.cookie = `token=${data.accessToken}; path=/; max-age=3600; SameSite=Strict`;

    const userData = await getUserData(data.accessToken);
    useAuthStore.getState().setUser(userData);

    document.cookie = `userRoles=${JSON.stringify(userData.roles)}; path=/; max-age=3600; SameSite=Strict`;

    return response;
};