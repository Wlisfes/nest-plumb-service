import { ApiProperty, PickType, OmitType } from '@nestjs/swagger'
import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator'
import { ICommon, RCommon } from '@/interface/common.interface'
import { IsOptional, IsCustomize } from '@/decorator/common.decorator'

export class IChart extends OmitType(ICommon, ['page', 'size', 'total']) {
	@ApiProperty({ description: '流程图标题', example: '刀剑神域' })
	@IsNotEmpty({ message: '流程图标题 必填' })
	title: string

	@ApiProperty({
		description: '画布位置',
		example: { width: '100%', height: '100%', scale: 1, offsetX: 0, offsetY: 0, x: 0, y: 0 }
	})
	@IsOptional()
	core: Object

	@ApiProperty({ description: '刻度线配置', example: { x: true, y: true } })
	@IsOptional()
	axis: Object
}
export class RChart extends PickType(RCommon, ['page', 'size', 'total']) {
	@ApiProperty({ description: '列表', type: [IChart], example: [] })
	list: Array<IChart>
}

export class IChartCreate extends PickType(IChart, ['title', 'core', 'axis']) {}
export class IChartUpdate extends PickType(IChart, ['uid', 'title', 'core', 'axis', 'status']) {}
export class IChartColumn extends PickType(ICommon, ['page', 'size']) {}
export class IChartOne extends PickType(IChart, ['uid']) {}

/******************************************************************/
export class IChunk extends OmitType(ICommon, ['page', 'size', 'total']) {
	@ApiProperty({ description: '流程图uid', example: 'c21b35f3-d8c9-4b96-bdde-386b4fa705ec' })
	@IsNotEmpty({ message: '流程图uid 必填' })
	chart: string

	@ApiProperty({ description: '流程块标题', example: '刀剑神域' })
	@IsNotEmpty({ message: '流程块标题 必填' })
	title: string

	@ApiProperty({ description: '左边距', example: '0px' })
	@IsNotEmpty({ message: '左边距 必填' })
	left: string

	@ApiProperty({ description: '上边距', example: '0px' })
	@IsNotEmpty({ message: '上边距 必填' })
	top: string

	@ApiProperty({ description: '节点数据', example: {} })
	@IsOptional()
	node: Object

	@ApiProperty({ description: '规则列表', example: [] })
	@IsOptional()
	@IsArray({ message: '规则列表参数错误' })
	@ValidateNested({ each: true, message: '规则列表参数错误' })
	rules: Array<Object>
}

export class IChunkCreate extends PickType(IChunk, ['title', 'left', 'top', 'node', 'rules', 'chart']) {}
export class IChunkUpdate extends PickType(IChunk, ['uid', 'title', 'left', 'top', 'node', 'rules']) {}
export class IChunkOne extends PickType(IChunk, ['uid']) {}

/******************************************************************/
export class IBezier extends OmitType(ICommon, ['page', 'size', 'total']) {
	@ApiProperty({ description: '流程图uid', example: 'c21b35f3-d8c9-4b96-bdde-386b4fa705ec' })
	@IsNotEmpty({ message: '流程图uid 必填' })
	chart: string

	@ApiProperty({ description: '连接线标题', example: '刀剑神域' })
	@IsNotEmpty({ message: '连接线标题 必填' })
	title: string

	@ApiProperty({ description: '起点uid', example: 'c21b35f3-d8c9-4b96-bdde-386b4fa705ec' })
	@IsNotEmpty({ message: '起点uid 必填' })
	source: string

	@ApiProperty({ description: '终点uid', example: 'c21b35f3-d8c9-4b96-bdde-386b4fa705ec' })
	@IsNotEmpty({ message: '终点uid 必填' })
	target: string

	@ApiProperty({ description: '节点数据', example: {} })
	@IsOptional()
	node: Object
}

export class IBezierCreate extends PickType(IBezier, ['title', 'source', 'target', 'node', 'chart']) {}
export class IBezierUpdate extends PickType(IBezier, ['uid', 'title', 'source', 'target', 'node']) {}
export class IBezierOne extends PickType(IBezier, ['uid']) {}
