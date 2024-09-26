import { baseStore } from '../stores/base.store';

export class ClaimsService {
  // static ax = AxiosConfig.axiosInstance;

  static async getAllClaims(tgUser) {
    const store = baseStore();

    const ax = store.axiosConfig.axiosInstance;

    const response = await ax
      .get('get_all_claims', { params: { uid: tgUser.id } })
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    console.log(response);
    return response.data.claims;
  }
}
