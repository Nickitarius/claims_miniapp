import axios from 'axios';
import { HttpCommon } from './http-common';
import process from 'process';

export class ClaimsService {
  static ax = HttpCommon.axiosInstance;

  static async getAllClaims(tgUser) {
    const response = await this.ax
      .get('get_all_claims', { params: { uid: tgUser.id } })
      .catch((error) => {
        console.log('s');

        // console.log(error.response);
        console.log('g');
        console.log(error.toJSON());
        console.log('p');
        throw error;
      });
    console.log(response);
    return response?.data;

    // const res = await axios
    //   .get('https://192.168.3.44:3900/claims/get_all_claims', { params: { uid: tgUser.id } })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // console.log('a');
    // console.log(res);
    // console.log('b');

    // return res;
  }
}
