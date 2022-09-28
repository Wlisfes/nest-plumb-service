import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiCompute } from '@/decorator/compute.decorator'
import { FlowChartService } from './flow-chart.service'
import { ChunkService } from './chunk.service'
import { BezierService } from './bezier.service'
import * as DTO from './flow-chart.interface'

@ApiTags('流程图模块')
@Controller('flow-chart')
export class FlowChartController {
	constructor(
		private readonly chartService: FlowChartService,
		private readonly chunkService: ChunkService,
		private readonly bezierService: BezierService
	) {}

	@Post('/create')
	@ApiCompute({
		operation: { summary: '创建流程图' },
		response: { status: 200, description: 'OK', type: DTO.IChart }
	})
	public async flowChartCreate(@Body() body: DTO.IChartCreate) {
		return body
	}
}
