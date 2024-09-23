import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsApiService } from './claims.api.service';

describe('ClaimsApiService', () => {
  let service: ClaimsApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClaimsApiService],
    }).compile();

    service = module.get<ClaimsApiService>(ClaimsApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
