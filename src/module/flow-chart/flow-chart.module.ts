import { Module } from '@nestjs/common'
import { FlowChartController } from './flow-chart.controller'
import { FlowChartService } from './flow-chart.service'

@Module({
	controllers: [FlowChartController],
	providers: [FlowChartService]
})
export class FlowChartModule {}
