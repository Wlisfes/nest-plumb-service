import { Controller, Post, Put, Get, Query, Body } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiCompute } from '@/decorator/compute.decorator'
import { ChartService } from './chart.service'
import * as DTO from './chart.interface'

@ApiTags('流程图模块')
@Controller('chart')
export class ChartController {
	constructor(private readonly chartService: ChartService) {}

	@Post('/create')
	@ApiCompute({
		operation: { summary: '创建流程图' },
		response: { status: 200, description: 'OK', type: DTO.UpdateChart }
	})
	public async httpCreateChart(@Body() body: DTO.CreateChart) {
		return this.chartService.httpCreateChart(body)
	}

	@Put('/update')
	@ApiCompute({
		operation: { summary: '修改流程图' },
		response: { status: 200, description: 'OK', type: DTO.UpdateChart }
	})
	public async httpUpdateChart(@Body() body: DTO.UpdateChart) {
		return this.chartService.httpUpdateChart(body)
	}

	@Get('/column')
	@ApiCompute({
		operation: { summary: '流程图列表' },
		response: { status: 200, description: 'OK' }
	})
	public async httpColumnChart(@Query() query) {
		return query
	}

	@Get('/one')
	@ApiCompute({
		operation: { summary: '流程图详情' },
		response: { status: 200, description: 'OK' }
	})
	public async httpOneChart(@Query() query: DTO.OneChart) {
		return this.chartService.httpOneChart(query)
	}

	@Post('/create/column')
	@ApiCompute({
		operation: { summary: '创建节点块' },
		response: { status: 200, description: 'OK' }
	})
	public async httpCreateColumn(@Body() body) {
		return this.chartService.httpCreateColumn(body)
	}

	@Post('/create/bezier')
	@ApiCompute({
		operation: { summary: '创建连接线' },
		response: { status: 200, description: 'OK' }
	})
	public async httpCreateBezier(@Body() body) {
		return this.chartService.httpCreateBezier(body)
	}
}
