import { Test, TestingModule } from '@nestjs/testing';
import { FlowChartService } from './flow-chart.service';

describe('FlowChartService', () => {
  let service: FlowChartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlowChartService],
    }).compile();

    service = module.get<FlowChartService>(FlowChartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
