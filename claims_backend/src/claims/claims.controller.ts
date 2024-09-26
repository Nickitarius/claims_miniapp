import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ClaimsApiService } from './claims.api/claims.api.service';

@Controller('claims')
export class ClaimsController {
  constructor(private claimsApiService: ClaimsApiService) {}

  @Get('get_all_claims')
  async getAllClaims(@Query('uid') uid) {
    try {
      return await this.claimsApiService.getAllClaims(uid);
    } catch (error) {
      console.log('murrrr');
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get_claim/:claim_no')
  async getClaim(@Param() params: any, @Query('uid') uid) {
    try {
      const claimNo = params.claim_no;
      console.log(claimNo);
      await this.claimsApiService.getClaim(claimNo, uid);
    } catch (error) {
      console.log('murrrr');
      throw new HttpException(error.response, error.status);
    }
  }
}
