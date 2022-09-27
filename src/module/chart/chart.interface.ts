import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { CommonQuery } from '@/interface/common.interface'
import { IsOptional } from '@/decorator/common.decorator'
import { Type } from 'class-transformer'

export class ChartEntity extends PickType(CommonQuery, ['id', 'uid', 'status', 'createTime', 'updateTime']) {
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

export class CreateChart extends PickType(ChartEntity, ['title', 'core', 'axis']) {}
export class UpdateChart extends PickType(ChartEntity, ['uid', 'title', 'core', 'axis', 'status']) {}
export class OneChart extends PickType(ChartEntity, ['uid']) {}
