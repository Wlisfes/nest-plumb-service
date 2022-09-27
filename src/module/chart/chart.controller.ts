import { Controller, Post, Put, Get, Query, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiConsumes, ApiProduces, ApiResponse } from '@nestjs/swagger'
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

	@ApiOperation({ summary: '流程图列表' })
	@ApiConsumes('application/x-www-form-urlencoded', 'application/json')
	@ApiProduces('application/json', 'application/xml')
	@Get('/column')
	@ApiResponse({ status: 200, description: 'OK' })
	public async httpColumnChart(@Query() query) {
		return query
	}

	@ApiOperation({ summary: '流程图详情' })
	@ApiProduces('application/json', 'application/xml')
	@Get('/one')
	@ApiResponse({ status: 200, description: 'OK' })
	public async httpOneChart(@Query() query: DTO.OneChart) {
		return this.chartService.httpOneChart(query)
	}

	@ApiOperation({ summary: '创建节点块' })
	@ApiProduces('application/json', 'application/xml')
	@Post('/create/column')
	@ApiResponse({ status: 200, description: 'OK' })
	public async httpCreateColumn(@Body() body) {
		return this.chartService.httpCreateColumn(body)
	}

	@ApiOperation({ summary: '创建连接线' })
	@ApiProduces('application/json', 'application/xml')
	@Post('/create/bezier')
	@ApiResponse({ status: 200, description: 'OK' })
	public async httpCreateBezier(@Body() body) {
		return this.chartService.httpCreateBezier(body)
	}
}
