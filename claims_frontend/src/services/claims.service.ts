import { HttpCommon } from './http-common';

export class ClaimsService {
  static ax = HttpCommon.axiosInstance;

  static async getAllClaims(tgUser) {
    const response = await this.ax
      .get('get_all_claims', { params: { uid: tgUser.id } })
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data.claims;
  }
}
