import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ClaimsApiService } from './claims.api/claims.api.service';
import { Response } from 'express';

@Controller('claims')
export class ClaimsController {
  constructor(private claimsApiService: ClaimsApiService) {}

  @Get('get_all_claims')
  async getAllClaims(@Query('uid') uid) {
    try {
      return await this.claimsApiService.getAllClaims(uid);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get_claim/:claim_no')
  async getClaim(@Param() params: any, @Query('uid') uid) {
    try {
      const claimNo = params.claim_no;
      return await this.claimsApiService.getClaim(claimNo, uid);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('action/get_accounts')
  async getAccounts(
    @Query('uid') uid,
    @Query('client_contract') clientContract,
  ) {
    try {
      return await this.claimsApiService.getAccounts(clientContract, uid);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('action/take_work')
  async takeWork(@Body() body, @Res() res: Response) {
    console.log('req');
    try {
      const status = await this.claimsApiService.takeWork(
        body.claim_id,
        body.claim_no,
        body.tg_user,
      );
      return res.status(status).send();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('action/senddefsms')
  async sendDefSMS(@Body() body, @Res() res: Response) {
    console.log('senddefsms');
    try {
      const status = await this.claimsApiService.sendDefSMS(
        body.claim_id,
        body.claim_no,
        body.claim_phone,
        body.tg_user,
      );
      return res.status(status).send();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('action/complete')
  async completeClaim(@Body() body, @Res() res: Response) {
    try {
      const status = await this.claimsApiService.completeClaim(
        body.claim_id,
        body.claim_no,
        body.commentary,
        body.write_offs,
        body.tg_user,
      );
      return res.status(status).send();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('action/addcomment')
  async addComment(@Body() body, @Res() res: Response) {
    try {
      const status = await this.claimsApiService.addComment(
        body.claim_id,
        body.claim_no,
        body.commentary,
        body.tg_user,
      );
      return res.status(status).send();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('action/return')
  async returnClaim(@Body() body, @Res() res: Response) {
    try {
      const status = await this.claimsApiService.returnClaim(
        body.claim_id,
        body.claim_no,
        body.commentary,
        body.tg_user,
      );
      return res.status(status).send();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('action/get_consumables')
  async getConsumables(@Query('uid') uid) {
    try {
      return await this.claimsApiService.getConsumables(uid);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
