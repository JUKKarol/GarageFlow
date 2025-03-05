import httpClient from "@/shared/tools/axiosInstance";

export const searchService = {
  async search(vin: string) {
    try {
      const response = await httpClient.get(`/Customer/history/${vin}`);
      return {
      data: response.data,
      status: response.status,
      success: true
      };
    } catch (error) {
      return {
      data: null,
      status: (error as any).response?.status || 500,
      success: false
      };
    }
  },
};

export const searchRepairsService = {
    async search(vin: string) {
      try {
        const response = await httpClient.get(`/Customer/repair/${vin}`);
        return {
          data: response.data,
          status: response.status,
          success: true
        };
      } catch (error) {
        return {
        data: null,
        status: (error as any).response?.status || 500,
        success: false
        };
      }
    },
  };
