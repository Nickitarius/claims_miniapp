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
        const claim = ClaimsUtils.adaptClaimAttributes(res.data);
        return claim;
      })
      .catch((error) => {
        throw error;
      });
    return response;
  }

  static async postTakeWork(claim, tgUser) {
    const store = baseStore();
    const ax = store.axiosConfig.axiosInstance;

    const data = { claim: claim, tg_user: tgUser };

    const response = await ax.post(`action/take_work`, data).catch((error) => {
      throw error;
    });
    return response;
  }

  static async postSendDefSMS(claim, tgUser) {
    const store = baseStore();
    const ax = store.axiosConfig.axiosInstance;

    const data = { claim: claim, tg_user: tgUser };

    const response = await ax.post(`action/senddefsms`, data).catch((error) => {
      throw error;
    });
    return response;
  }

  static async completeClaim(claim, commentary, tgUser) {
    const store = baseStore();
    const ax = store.axiosConfig.axiosInstance;

    const data = { claim: claim, tg_user: tgUser, commentary: commentary };

    const response = await ax.post(`action/complete`, data).catch((error) => {
      throw error;
    });
    return response;
  }

  static async addComment(claim, commentary, tgUser) {
    const store = baseStore();
    const ax = store.axiosConfig.axiosInstance;

    const data = { claim: claim, tg_user: tgUser, commentary: commentary };

    const response = await ax.post(`action/addcomment`, data).catch((error) => {
      throw error;
    });
    return response;
  }

  static async returnClaim(claim, commentary, tgUser) {
    const store = baseStore();
    const ax = store.axiosConfig.axiosInstance;

    const data = { claim: claim, tg_user: tgUser, commentary: commentary };

    const response = await ax.post(`action/return`, data).catch((error) => {
      throw error;
    });
    return response;
  }
}
