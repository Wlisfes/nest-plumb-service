import { ApiProperty, PickType, OmitType } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { ICommon } from '@/interface/common.interface'
import { IsOptional } from '@/decorator/common.decorator'

export class IBezier extends OmitType(ICommon, ['page', 'size']) {
	@ApiProperty({ description: '流程块UID' })
	@IsNotEmpty({ message: '流程块UID 必填' })
	uid: string

	@ApiProperty({ description: '流程图uid' })
	@IsNotEmpty({ message: '流程图uid 必填' })
	flow: string

	@ApiProperty({ required: false, description: '连接线标题', example: '刀剑神域' })
	@IsOptional()
	label: string

	@ApiProperty({ description: '起点块节点UID' })
	@IsNotEmpty({ message: '起点块节点UID 必填' })
	parent: string

	@ApiProperty({ description: '起点规则点UID' })
	@IsNotEmpty({ message: '起点规则点UID 必填' })
	source: string

	@ApiProperty({ description: '终点块节点UID' })
	@IsNotEmpty({ message: '终点块节点UID 必填' })
	target: string
}

export class ICreate extends PickType(IBezier, ['uid', 'flow', 'parent', 'source', 'target', 'label']) {}
export class IUpdate extends PickType(IBezier, []) {}
export class IOne extends PickType(IBezier, ['uid']) {}
