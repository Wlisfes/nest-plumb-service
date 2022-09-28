import { Module } from '@nestjs/common'
import { FlowChartController } from './flow-chart.controller'
import { FlowChartService } from './flow-chart.service'
import { ChunkService } from './chunk.service'
import { BezierService } from './bezier.service'

@Module({
	controllers: [FlowChartController],
	providers: [FlowChartService, ChunkService, BezierService]
})
export class FlowChartModule {}
