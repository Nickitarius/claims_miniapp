import { baseStore } from '../stores/base.store';
import { ClaimsUtils } from '../utils/calims.utils';

export class ClaimsService {
  static async getAllClaims(tgUser) {
    const store = baseStore();
    const ax = store.axiosConfig.axiosInstance;

    const response = await ax
      .get('get_all_claims', { params: { uid: tgUser.id } })
      .catch((error) => {
        throw error;
      });
    return response.data.claims;
  }

  static async getClaimByClaimNo(claimNo, tgUser) {
    const store = baseStore();
    const ax = store.axiosConfig.axiosInstance;

    const response = await ax
      .get(`get_claim/${claimNo}`, { params: { uid: tgUser.id } })
      .then((res) => {
        console.log(res);
        const claim = ClaimsUtils.adaptClaimAttributes(res.data);
        return claim;
      })
      .catch((error) => {
        throw error;
      });
    // const claim = ClaimsUtils.adaptClaimAttributes(response.data);
    return response;
  }

  static async postTakeWork(tgUser, claim) {
    const store = baseStore();
    const ax = store.axiosConfig.axiosInstance;

    const data = { claim: claim, tg_user: tgUser };

    const response = await ax.post(`action/take_work`, data).catch((error) => {
      console.log(error);
      throw error;
    });
    return response;
  }
}
