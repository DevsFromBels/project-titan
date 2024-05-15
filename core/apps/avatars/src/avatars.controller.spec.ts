import { Test, TestingModule } from '@nestjs/testing';
import { AvatarsController } from './avatars.controller';
import { AvatarsService } from './avatars.service';

describe('AvatarsController', () => {
  let avatarsController: AvatarsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AvatarsController],
      providers: [AvatarsService],
    }).compile();

    avatarsController = app.get<AvatarsController>(AvatarsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(avatarsController.getHello()).toBe('Hello World!');
    });
  });
});
