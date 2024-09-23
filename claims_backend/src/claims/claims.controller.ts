import { Controller, Get, Query } from '@nestjs/common';
import { ClaimsApiService } from './claims.api/claims.api.service';

@Controller('claims')
export class ClaimsController {
  constructor(private claimsApiService: ClaimsApiService) {}

  @Get('get_all_claims')
  async getAllClaims(@Query('uid') uid) {
    console.log('req');
    return await this.claimsApiService.getAllClaims(uid);
  }
}
