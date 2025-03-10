import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpResponse, Payload } from './types/Axios';

export class Axios {
    private axiosInstance: AxiosInstance;

    public constructor() {
        this.axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            timeout: 100000,
            validateStatus: () => true
        });
    }

    private async request<T>(axiosRequest: AxiosRequestConfig): Promise<HttpResponse<T>> {
        const axiosResponse = await this.axiosInstance.request(axiosRequest);

        return { status: axiosResponse.status, body: axiosResponse.data };
    }

    public async get<T>(url: string, payload?: Payload): Promise<HttpResponse<T>> {
        const axiosRequest: AxiosRequestConfig = { url, method: 'get' };

        return await this.request({
            ...axiosRequest,
            params: payload
        });
    }

    public async post<T>(url: string, payload?: Payload): Promise<HttpResponse<T>> {
        const axiosRequest = { url, method: 'post' };

        return await this.request({
            ...axiosRequest,
            data: payload
        });
    }
}
