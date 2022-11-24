import { Module } from '@nestjs/common'
import { FlowChartController } from './flow-chart.controller'
import { FlowChartService } from './flow-chart.service'
import { ChunkService } from './chunk.service'
import { BezierService } from './bezier.service'

import { NodeService } from './node.service'
import { ColumnService } from './column.service'

@Module({
	controllers: [FlowChartController],
	providers: [FlowChartService, ChunkService, BezierService, NodeService, ColumnService]
})
export class FlowChartModule {}
