import { Controller, Post, Put, Get, Body, Query } from '@nestjs/common'
import { ApiTags, PickType } from '@nestjs/swagger'
import { ApiCompute } from '@/decorator/compute.decorator'
import { ICommon, RCommon } from '@/interface/common.interface'
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
		response: { status: 200, description: 'OK', type: PickType(RCommon, ['message']) }
	})
	public async httpChartCreate(@Body() body: DTO.IChartCreate) {
		return await this.chartService.httpChartCreate(body)
	}

	@Put('/update')
	@ApiCompute({
		operation: { summary: '修改流程图' },
		response: { status: 200, description: 'OK', type: PickType(RCommon, ['message']) }
	})
	public async httpChartUpdate(@Body() body: DTO.IChartUpdate) {
		return await this.chartService.httpChartUpdate(body)
	}

	@Get('/column')
	@ApiCompute({
		operation: { summary: '流程图列表' },
		response: { status: 200, description: 'OK', type: DTO.RChart }
	})
	public async httpColumnChart(@Query() query: DTO.IChartColumn) {
		return await this.chartService.httpColumnChart(query)
	}

	@Get('/one')
	@ApiCompute({
		operation: { summary: '流程图详情' },
		response: { status: 200, description: 'OK', type: DTO.IChart }
	})
	public async httpChartOne(@Query() query: DTO.IChartOne) {
		return await this.chartService.httpOneChart(query)
	}

	@Post('/create-chunk')
	@ApiCompute({
		operation: { summary: '创建节点块' },
		response: { status: 200, description: 'OK', type: PickType(RCommon, ['message']) }
	})
	public async httpChunkCreate(@Body() body: DTO.IChunkCreate) {
		return await this.chunkService.httpChunkCreate(body)
	}

	@Put('/update-chunk')
	@ApiCompute({
		operation: { summary: '修改节点块' },
		response: { status: 200, description: 'OK', type: PickType(RCommon, ['message']) }
	})
	public async httpChunkUpdate(@Body() body: DTO.IChunkUpdate) {
		return await this.chunkService.httpChunkUpdate(body)
	}

	@Get('/one-chunk')
	@ApiCompute({
		operation: { summary: '节点块详情' },
		response: { status: 200, description: 'OK', type: DTO.IChunk }
	})
	public async httpOneChunk(@Query() query: DTO.IChunkOne) {
		return await this.chunkService.httpOneChunk(query)
	}

	@Post('/create-bezier')
	@ApiCompute({
		operation: { summary: '创建连接线' },
		response: { status: 200, description: 'OK', type: PickType(RCommon, ['message']) }
	})
	public async httpBezierCreate(@Body() body: DTO.IBezierCreate) {
		return await this.bezierService.httpBezierCreate(body)
	}

	@Put('/update-bezier')
	@ApiCompute({
		operation: { summary: '修改连接线' },
		response: { status: 200, description: 'OK', type: PickType(RCommon, ['message']) }
	})
	public async httpBezierUpdate(@Body() body: DTO.IBezierUpdate) {
		return await this.bezierService.httpBezierUpdate(body)
	}

	@Get('/one-bezier')
	@ApiCompute({
		operation: { summary: '连接线信息' },
		response: { status: 200, description: 'OK', type: DTO.IBezier }
	})
	public async httpOneBezier(@Query() query: DTO.IBezierOne) {
		return await this.bezierService.httpOneBezier(query)
	}
}
