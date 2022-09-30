import { ApiProperty, PickType, OmitType } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { IsOptional } from '@/decorator/common.decorator'
import { ICommon, RCommon } from '@/interface/common.interface'
import { IBezier } from './bezier.interface'
import { IChunk } from './chunk.interface'

export class IChart extends OmitType(ICommon, ['page', 'size']) {
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

	@ApiProperty({ description: '流程块列表', type: () => [IChunk], example: [] })
	chunk: IChunk[]

	@ApiProperty({ description: '连接线列表', type: () => [IBezier], example: [] })
	bezier: IBezier[]
}
export class RChart extends PickType(RCommon, ['page', 'size', 'total']) {
	@ApiProperty({ description: '列表', type: [OmitType(IChart, ['chunk', 'bezier'])], example: [] })
	list: IChart[]
}

export class ICreate extends PickType(IChart, ['title', 'core', 'axis']) {}
export class IUpdate extends PickType(IChart, ['uid', 'title', 'core', 'axis', 'status']) {}
export class IColumn extends PickType(ICommon, ['page', 'size']) {}
export class IOne extends PickType(IChart, ['uid']) {}
