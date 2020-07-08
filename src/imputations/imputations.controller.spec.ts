import { Test, TestingModule } from '@nestjs/testing';
import { ImputationsController } from './imputations.controller';

describe('Imputations Controller', () => {
  let controller: ImputationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImputationsController],
    }).compile();

    controller = module.get<ImputationsController>(ImputationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
