import { Controller, Get, Post, Req } from '@nestjs/common';
import { Ctx } from 'nestjs-telegraf';
import { CustomContext } from 'src/interfaces/context.interface';
import { NotificationService } from './notification.service';

@Controller('/notify')
export class ClaimNotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async notifyPost(@Ctx() context: CustomContext, @Req() req: Request) {
    return await this.notificationService.notify(context, req);
  }

  @Get()
  async notifyGet() {
    return 'POST only';
  }
}
