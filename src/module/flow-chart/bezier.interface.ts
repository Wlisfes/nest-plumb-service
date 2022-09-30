import { ApiProperty, PickType, OmitType } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { ICommon } from '@/interface/common.interface'
import { IsOptional } from '@/decorator/common.decorator'

export class IBezier extends OmitType(ICommon, ['page', 'size']) {
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

export class ICreate extends PickType(IBezier, ['title', 'source', 'target', 'node', 'chart']) {}
export class IUpdate extends PickType(IBezier, ['uid', 'title', 'source', 'target', 'node']) {}
export class IOne extends PickType(IBezier, ['uid']) {}
