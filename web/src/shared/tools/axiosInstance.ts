import axios, { type AxiosRequestConfig } from 'axios';
import { apiUrl } from '@/enviroment';

const baseURL = apiUrl;

const httpClient = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
});

export default httpClient;