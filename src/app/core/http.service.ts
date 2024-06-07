import axios, { AxiosResponse } from 'axios';

export default class HttpService {
  static post(endpoint: string, data: any): Promise<AxiosResponse> {
    const url = `${process.env.NEXT_PUBLIC_URL_BASE}/${endpoint}`;
    return axios.post(url, data);
  }

  static get(endpoint: string) {
    const url = `${process.env.NEXT_PUBLIC_URL_BASE}/${endpoint}`;
    return axios.get(url);
  }

  static put(endpoint: string, data: any): Promise<AxiosResponse> {
    const url = `${process.env.NEXT_PUBLIC_URL_BASE}/${endpoint}`;
    return axios.put(url, data);
  }

  static delete(endpoint: string): Promise<AxiosResponse> {
    const url = `${process.env.NEXT_PUBLIC_URL_BASE}/${endpoint}`;
    return axios.delete(url);
  }
}