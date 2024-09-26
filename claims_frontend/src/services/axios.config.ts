import axios, { AxiosInstance } from 'axios';

export class AxiosConfig {
  private backendUrl = 'https://lb2q1lw2-3900.euw.devtunnels.ms/claims';
  public axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.backendUrl,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    this.axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        console.log('cringe');
        //   if (error.response.status == 401) {
        //     store.dispatch("auth/logout");
        //     window.location.href = "/login";
        //   }
        throw error;
      },
    );
  }
}
