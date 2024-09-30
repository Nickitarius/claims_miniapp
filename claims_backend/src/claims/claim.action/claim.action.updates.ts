import { Action, Ctx, Update } from 'nestjs-telegraf';
import { CustomContext } from 'src/interfaces/context.interface';
import { ClaimActionService } from './claim.action.service';

@Update()
export class ClaimActionUpdates {
  constructor(private readonly calimActionService: ClaimActionService) {}

  @Action(/^cl_action/)
  async claimAction(@Ctx() ctx: CustomContext) {
    await this.calimActionService.claimAction(ctx);
  }
}
