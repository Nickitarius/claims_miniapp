import axios from 'axios';

export class HttpCommon {
  // static backendUrl = 'https://192.168.3.44:3900/claims';
  // 'https://2zht6sdg-3900.euw.devtunnels.ms/claims'
  static backendUrl = 'https://lb2q1lw2-3900.euw.devtunnels.ms/claims'

  static axiosInstance = axios.create({
    baseURL: this.backendUrl,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

  //   axiosInstance.interceptors.response.use(
  //     function (response) {
  //       return response;
  //     },
  //     function (error) {
  //     //   if (error.response.status == 401) {
  //     //     store.dispatch("auth/logout");
  //     //     window.location.href = "/login";
  //     //   }
  //       throw error;
  //     }
  //   );
}
