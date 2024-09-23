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

  async getAllClaims(uid: string) {
    const uuidOne = uuidV4();

    const requestConfig = {
      auth: {
        username: this.configService.get('API_USER'),
        password: this.configService.get('API_PASS'),
      },
    };
    const url = this.apiUrl + `?uid=${uid}`;

    let response;

    try {
      this.logger.log(`${uid} Request ${url}`);
      response = await firstValueFrom(
        this.httpService.get(url, requestConfig).pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
      );
    } catch (error) {
      ClaimsUtils.handleReqError(error, uuidOne, uid, this.logger);
    }

    const data = response.data;
    return data;
  }
}
