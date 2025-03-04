import httpClient from "@/shared/tools/axiosInstance";

export const getUserData = async (token: string) => {
    const response = await httpClient.get("/auth/user?sorts=userName", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

interface RoleChangePayload {
    email: string;
    role: string;
  }
  
  export const addUserRole = async (token: string, payload: RoleChangePayload) => {
    const response = await httpClient.post("/auth/userRole", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
  };
  
  export const deleteUserRole = async (token: string, payload: RoleChangePayload) => {
    const response = await httpClient.delete("/auth/userRole", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    });
  
    return response.data;
  };