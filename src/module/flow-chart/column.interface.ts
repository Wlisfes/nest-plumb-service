import { ApiProperty, PickType, OmitType } from '@nestjs/swagger'
import { IsNotEmpty, IsArray } from 'class-validator'
import { ICommon } from '@/interface/common.interface'
import { IsOptional } from '@/decorator/common.decorator'

interface IRule {
	uid?: string
	content: string
	max: number
	visible: number
}

export class IColumn extends OmitType(ICommon, ['page', 'size']) {
	@ApiProperty({ description: '流程块UID' })
	@IsNotEmpty({ message: '流程块UID 必填' })
	uid: string

	@ApiProperty({ description: '流程图uid' })
	@IsNotEmpty({ message: '流程图uid 必填' })
	flow: string

	@ApiProperty({ description: '左边距', example: '0px' })
	@IsNotEmpty({ message: '左边距 必填' })
	left: string

	@ApiProperty({ description: '上边距', example: '0px' })
	@IsNotEmpty({ message: '上边距 必填' })
	top: string

	@ApiProperty({ description: '节点数据' })
	@IsOptional()
	current: Object

	@ApiProperty({ description: '规则列表', example: [] })
	@IsOptional()
	@IsArray({ message: '规则列表参数错误' })
	rules: IRule[]
}

export class ICreate extends PickType(IColumn, ['uid', 'flow', 'left', 'top', 'current', 'rules']) {}
export class IUpdate extends PickType(IColumn, ['uid', 'left', 'top']) {}
export class IOne extends PickType(IColumn, ['uid']) {}
