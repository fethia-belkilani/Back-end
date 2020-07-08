import { Test, TestingModule } from '@nestjs/testing';
import { ImputationsService } from './imputations.service';

describe('ImputationsService', () => {
  let service: ImputationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImputationsService],
    }).compile();

    service = module.get<ImputationsService>(ImputationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
