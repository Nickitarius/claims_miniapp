import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsBotService } from './claims.bot.service';

describe('ClaimsService', () => {
  let service: ClaimsBotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClaimsBotService],
    }).compile();

    service = module.get<ClaimsBotService>(ClaimsBotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
