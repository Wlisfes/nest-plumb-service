import { Test, TestingModule } from '@nestjs/testing';
import { FlowChartController } from './flow-chart.controller';

describe('FlowChartController', () => {
  let controller: FlowChartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlowChartController],
    }).compile();

    controller = module.get<FlowChartController>(FlowChartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
