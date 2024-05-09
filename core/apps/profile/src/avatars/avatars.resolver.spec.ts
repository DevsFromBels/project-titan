import { Test, TestingModule } from '@nestjs/testing';
import { AvatarsResolver } from './avatars.resolver';
import { AvatarsService } from './avatars.service';

describe('AvatarsResolver', () => {
  let resolver: AvatarsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvatarsResolver, AvatarsService],
    }).compile();

    resolver = module.get<AvatarsResolver>(AvatarsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
