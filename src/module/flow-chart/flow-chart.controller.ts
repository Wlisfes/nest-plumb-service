import { Controller, Post, Put, Get, Body, Query } from '@nestjs/common'
import { ApiTags, PickType } from '@nestjs/swagger'
import { ApiCompute } from '@/decorator/compute.decorator'
import { RCommon } from '@/interface/common.interface'
import { FlowChartService } from './flow-chart.service'
import { ChunkService } from './chunk.service'
import { BezierService } from './bezier.service'
import { NodeService } from './node.service'
import { ColumnService } from './column.service'

import * as Chart from './flow-chart.interface'
import * as Bezier from './bezier.interface'
import * as Chunk from './chunk.interface'

import * as INode from './node.interface'
import * as IColumn from './column.interface'

@ApiTags('流程图模块')
@Controller('flow-chart')
export class FlowChartController {
	constructor(
		private readonly chartService: FlowChartService,
		private readonly chunkService: ChunkService,
		private readonly bezierService: BezierService,
		private readonly nodeService: NodeService,
		private readonly columnService: ColumnService
	) {}

	@Post('/create-node')
	@ApiCompute({
		operation: { summary: '创建节点' },
		response: { status: 200, description: 'OK', type: PickType(RCommon, ['message']) }
	})
	public async httpCreateNode(@Body() body: INode.ICreate) {
		return await this.nodeService.httpCreateNode(body)
	}

	@Get('/column-node')
	@ApiCompute({
		operation: { summary: '节点列表' },
		response: { status: 200, description: 'OK', type: INode.RColumn }
	})
	public async httpColumnNode(@Query() query: Chart.IColumn) {
		return await this.nodeService.httpColumnNode(query)
	}

	@Post('/create')
	@ApiCompute({
		operation: { summary: '创建工作流' },
		response: { status: 200, description: 'OK', type: PickType(RCommon, ['message']) }
	})
	public async httpCreateChart(@Body() body: Chart.ICreate) {
		return await this.chartService.httpCreateChart(body)
	}

	// @Put('/update')
	// @ApiCompute({
	// 	operation: { summary: '修改流程图' },
	// 	response: { status: 200, description: 'OK', type: PickType(RCommon, ['message']) }
	// })
	// public async httpUpdateChart(@Body() body: Chart.IUpdate) {
	// 	return await this.chartService.httpUpdateChart(body)
	// }

	@Get('/column')
	@ApiCompute({
		operation: { summary: '工作流列表' },
		response: { status: 200, description: 'OK', type: Chart.RColumn }
	})
	public async httpColumnChart(@Query() query: Chart.IColumn) {
		return await this.chartService.httpColumnChart(query)
	}

	@Get('/one')
	@ApiCompute({
		operation: { summary: '流程图详情' },
		response: { status: 200, description: 'OK', type: Chart.IChart }
	})
	public async httpOneChart(@Query() query: Chart.IOne) {
		return await this.chartService.httpOneChart(query)
	}

	@Post('/create-column')
	@ApiCompute({
		operation: { summary: '创建节点块' },
		response: { status: 200, description: 'OK', type: PickType(RCommon, ['message']) }
	})
	public async httpCreateColumn(@Body() body: IColumn.ICreate) {
		return await this.columnService.httpCreateColumn(body)
	}

	@Put('/update-column')
	@ApiCompute({
		operation: { summary: '修改节点块' },
		response: { status: 200, description: 'OK', type: PickType(RCommon, ['message']) }
	})
	public async httpUpdateColumn(@Body() body: IColumn.IUpdate) {
		return await this.columnService.httpUpdateColumn(body)
	}

	// @Get('/one-chunk')
	// @ApiCompute({
	// 	operation: { summary: '节点块详情' },
	// 	response: { status: 200, description: 'OK', type: Chunk.IChunk }
	// })
	// public async httpOneChunk(@Query() query: Chunk.IOne) {
	// 	return await this.chunkService.httpOneChunk(query)
	// }

	@Post('/create-bezier')
	@ApiCompute({
		operation: { summary: '创建连接线' },
		response: { status: 200, description: 'OK', type: PickType(RCommon, ['message']) }
	})
	public async httpCreateBezier(@Body() body: Bezier.ICreate) {
		return await this.bezierService.httpCreateBezier(body)
	}

	// @Put('/update-bezier')
	// @ApiCompute({
	// 	operation: { summary: '修改连接线' },
	// 	response: { status: 200, description: 'OK', type: PickType(RCommon, ['message']) }
	// })
	// public async httpUpdateBezier(@Body() body: Bezier.IUpdate) {
	// 	return await this.bezierService.httpUpdateBezier(body)
	// }

	// @Get('/one-bezier')
	// @ApiCompute({
	// 	operation: { summary: '连接线信息' },
	// 	response: { status: 200, description: 'OK', type: Bezier.IBezier }
	// })
	// public async httpOneBezier(@Query() query: Bezier.IOne) {
	// 	return await this.bezierService.httpOneBezier(query)
	// }
}
