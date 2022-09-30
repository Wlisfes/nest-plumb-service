import { ApiProperty, PickType, OmitType } from '@nestjs/swagger'
import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator'
import { ICommon } from '@/interface/common.interface'
import { IsOptional } from '@/decorator/common.decorator'

export class IChunk extends OmitType(ICommon, ['page', 'size']) {
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

export class ICreate extends PickType(IChunk, ['title', 'left', 'top', 'node', 'rules', 'chart']) {}
export class IUpdate extends PickType(IChunk, ['uid', 'title', 'left', 'top', 'node', 'rules']) {}
export class IOne extends PickType(IChunk, ['uid']) {}
