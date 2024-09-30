import axios, { AxiosInstance } from 'axios';
import router from '../router';
import { baseStore } from '../stores/base.store';

export class AxiosConfig {
  private backendUrl = 'https://lb2q1lw2-3900.euw.devtunnels.ms/claims';
  public axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.backendUrl,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });

    this.axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        const store = baseStore();
        store.currentErrorMessage = error;
        router.push('/error');
      },
    );
  }
}
