import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { ClaimActionModule } from './claim.action/claim.action.module';
import { NotificationModule } from './claim.notification/notification.module';
import { Claims } from './claims';
import { ClaimsApiService } from './claims.api/claims.api.service';
import { ClaimsBotService } from './claims.bot.service';
import { ClaimsUpdate } from './claims.update';
import { CommentScene } from './scenes/comment.scene';
import { StartScene } from './scenes/start.scene';
import { ClaimsController } from './claims.controller';

@Module({
  imports: [
    HttpModule,
    NotificationModule,
    forwardRef(() => ClaimActionModule),
  ],
  providers: [
    ClaimsBotService,
    ClaimsUpdate,
    CommentScene,
    StartScene,
    ClaimsApiService,
    Claims,
  ],
  controllers: [ClaimsController],
  exports: [ClaimsBotService],
})
export class ClaimsModule {}
