import { Test, TestingModule } from '@nestjs/testing';
import { Claims } from './claims';

describe('Claims', () => {
  let provider: Claims;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Claims],
    }).compile();

    provider = module.get<Claims>(Claims);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
