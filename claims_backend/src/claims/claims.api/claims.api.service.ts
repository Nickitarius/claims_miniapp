import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { v4 as uuidV4 } from 'uuid';
import { ClaimsUtils } from '../claims.utils';

@Injectable()
export class ClaimsApiService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    const url = this.configService.get('API_URL');
    const port = this.configService.get('API_PORT');
    this.apiUrl = `http://${url}:${port}/claims`;
  }

  private readonly logger = new Logger(ClaimsApiService.name);
  private readonly apiUrl;

  async getAllClaims(uid: string): Promise<any> {
    const uuidOne = uuidV4();

    const requestConfig = {
      auth: {
        username: this.configService.get('API_USER'),
        password: this.configService.get('API_PASS'),
      },
    };
    const url = this.apiUrl + `?uid=${uid}`;

    this.logger.log(`${uid} Request ${url}`);

    const response = await firstValueFrom(
      await this.httpService.get(url, requestConfig).pipe(
        catchError((error: AxiosError) => {
          const errText = ClaimsUtils.handleReqError(
            error,
            uuidOne,
            uid,
            this.logger,
          );
          throw errText;
        }),
      ),
    );

    const data = response.data;
    return data;
  }

  async getClaim(claimNo, uid: string) {
    const uuidOne = uuidV4();

    const requestConfig = {
      auth: {
        username: this.configService.get('API_USER'),
        password: this.configService.get('API_PASS'),
      },
    };

    const url = this.apiUrl + `/${claimNo}?uid=${uid}`;

    this.logger.log(`${uid} Request ${url}`);
    const response = await firstValueFrom(
      this.httpService.get(url, requestConfig).pipe(
        catchError((error: AxiosError) => {
          ClaimsUtils.handleReqError(error, uuidOne, uid, this.logger);
          throw error;
        }),
      ),
    );

    const data = response.data;
    return data;
  }

  async getAccounts(clientContract, uid: string) {
    const uuidOne = uuidV4();

    const requestConfig = {
      auth: {
        username: this.configService.get('API_USER'),
        password: this.configService.get('API_PASS'),
      },
    };

    const url = this.apiUrl + `/action?uid=${uid}`;

    const data = {
      id: uuidOne,
      type: 'getaccounts',
      user_id: uid,
      options: { contract: clientContract },
    };

    this.logger.log(`${uid} Request ${url}`);
    const response = await firstValueFrom(
      this.httpService.post(url, data, requestConfig).pipe(
        catchError((error: AxiosError) => {
          ClaimsUtils.handleReqError(error, uuidOne, uid, this.logger);
          throw error;
        }),
      ),
    );
    return response.data;
  }

  async takeWork(claimId, claimNo, tgUser) {
    const uuidOne = uuidV4();

    const requestConfig = {
      auth: {
        username: this.configService.get('API_USER'),
        password: this.configService.get('API_PASS'),
      },
    };
    const url = this.apiUrl + `/action?uid=${tgUser.user_id}`;

    const data = {
      id: uuidOne,
      type: 'takework',
      claim_id: claimId,
      claim_no: claimNo,
      username: tgUser.username,
      first_name: tgUser.first_name,
      user_id: tgUser.user_id,
    };

    this.logger.log(`${tgUser.user_id} Request ${url}`);
    const response = await firstValueFrom(
      this.httpService.post(url, data, requestConfig).pipe(
        catchError((error: AxiosError) => {
          ClaimsUtils.handleReqError(
            error,
            uuidOne,
            tgUser.user_id,
            this.logger,
          );
          throw error;
        }),
      ),
    );

    return response.status;
  }

  async sendDefSMS(claimId, claimNo, claimPhone, tgUser) {
    const uuidOne = uuidV4();

    const requestConfig = {
      auth: {
        username: this.configService.get('API_USER'),
        password: this.configService.get('API_PASS'),
      },
    };
    const url = this.apiUrl + `/action?uid=${tgUser.user_id}`;

    console.log(claimPhone);

    const data = {
      id: uuidOne,
      type: 'senddefsms',
      claim_id: claimId,
      claim_no: claimNo,
      username: tgUser.username,
      first_name: tgUser.first_name,
      user_id: tgUser.user_id,
      options: { phone: claimPhone, def_id: 1 },
    };

    this.logger.log(`${tgUser.user_id} Request ${url}`);
    const response = await firstValueFrom(
      this.httpService.post(url, data, requestConfig).pipe(
        catchError((error: AxiosError) => {
          ClaimsUtils.handleReqError(
            error,
            uuidOne,
            tgUser.user_id,
            this.logger,
          );
          throw error;
        }),
      ),
    );

    return response.status;
  }

  async completeClaim(claimId, claimNo, commentary, writeOffs, tgUser) {
    const uuidOne = uuidV4();

    const requestConfig = {
      auth: {
        username: this.configService.get('API_USER'),
        password: this.configService.get('API_PASS'),
      },
    };
    const url = this.apiUrl + `/action?uid=${tgUser.user_id}`;

    const data = {
      id: uuidOne,
      type: 'complete',
      claim_id: claimId,
      claim_no: claimNo,
      username: tgUser.username,
      first_name: tgUser.first_name,
      user_id: tgUser.user_id,
      commentary: commentary,
      write_offs: writeOffs,
    };

    this.logger.log(`${tgUser.user_id} Request ${url}`);
    const response = await firstValueFrom(
      this.httpService.post(url, data, requestConfig).pipe(
        catchError((error: AxiosError) => {
          console.log('pip');
          ClaimsUtils.handleReqError(
            error,
            uuidOne,
            tgUser.user_id,
            this.logger,
          );
          throw error;
        }),
      ),
    );

    return response.status;
  }

  async addComment(claimId, claimNo, commentary, tgUser) {
    const uuidOne = uuidV4();

    const requestConfig = {
      auth: {
        username: this.configService.get('API_USER'),
        password: this.configService.get('API_PASS'),
      },
    };
    const url = this.apiUrl + `/action?uid=${tgUser.user_id}`;

    const data = {
      id: uuidOne,
      type: 'addcomment',
      claim_id: claimId,
      claim_no: claimNo,
      username: tgUser.username,
      first_name: tgUser.first_name,
      user_id: tgUser.user_id,
      commentary: commentary,
    };

    this.logger.log(`${tgUser.user_id} Request ${url}`);
    const response = await firstValueFrom(
      this.httpService.post(url, data, requestConfig).pipe(
        catchError((error: AxiosError) => {
          console.log('pip');
          ClaimsUtils.handleReqError(
            error,
            uuidOne,
            tgUser.user_id,
            this.logger,
          );
          throw error;
        }),
      ),
    );

    return response.status;
  }

  async returnClaim(claimId, claimNo, commentary, tgUser) {
    const uuidOne = uuidV4();

    const requestConfig = {
      auth: {
        username: this.configService.get('API_USER'),
        password: this.configService.get('API_PASS'),
      },
    };
    const url = this.apiUrl + `/action?uid=${tgUser.user_id}`;

    const data = {
      id: uuidOne,
      type: 'return',
      claim_id: claimId,
      claim_no: claimNo,
      username: tgUser.username,
      first_name: tgUser.first_name,
      user_id: tgUser.user_id,
      commentary: commentary,
    };

    this.logger.log(`${tgUser.user_id} Request ${url}`);
    const response = await firstValueFrom(
      this.httpService.post(url, data, requestConfig).pipe(
        catchError((error: AxiosError) => {
          console.log('pip');
          ClaimsUtils.handleReqError(
            error,
            uuidOne,
            tgUser.user_id,
            this.logger,
          );
          throw error;
        }),
      ),
    );

    return response.status;
  }

  async getConsumables(uid) {
    const uuidOne = uuidV4();

    const requestConfig = {
      auth: {
        username: this.configService.get('API_USER'),
        password: this.configService.get('API_PASS'),
      },
    };

    const url = this.apiUrl + `/get_consumables?uid=${uid}`;

    this.logger.log(`${uid} Request ${url}`);

    const response = await firstValueFrom(
      await this.httpService.get(url, requestConfig).pipe(
        catchError((error: AxiosError) => {
          const errText = ClaimsUtils.handleReqError(
            error,
            uuidOne,
            uid,
            this.logger,
          );
          throw errText;
        }),
      ),
    );

    return response.data;
  }
}
