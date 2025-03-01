import httpClient from "@/shared/tools/axiosInstance";

interface InvoiceDataRequest {
    repairId: string;
    customerAddress: string;
    nip?: string;
}

export const createInvoice = async (token: string, data: InvoiceDataRequest) => {
    const response = await httpClient.post("/repair/invoice", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
}