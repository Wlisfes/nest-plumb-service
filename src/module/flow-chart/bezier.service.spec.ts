import { Test, TestingModule } from '@nestjs/testing';
import { BezierService } from './bezier.service';

describe('BezierService', () => {
  let service: BezierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BezierService],
    }).compile();

    service = module.get<BezierService>(BezierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
