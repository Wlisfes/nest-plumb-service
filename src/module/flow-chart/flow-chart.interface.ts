import { ApiProperty, PickType, OmitType } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { IsOptional } from '@/decorator/common.decorator'
import { ICommon, RCommon } from '@/interface/common.interface'
import { IBezier } from './bezier.interface'
import { IChunk } from './chunk.interface'

export class IChart extends OmitType(ICommon, ['page', 'size']) {
	@ApiProperty({ description: '流程图初始节点UID' })
	@IsNotEmpty({ message: '流程图初始节点UID 必填' })
	uid: string

	@ApiProperty({ description: '流程图标题', example: '刀剑神域' })
	@IsNotEmpty({ message: '流程图标题 必填' })
	title: string

	@ApiProperty({ description: '工作流类型: BIND_TASK、AUTO_MATIC、CREATE_TRIGGER' })
	@IsNotEmpty({ message: '工作流类型 必填' })
	type: string

	@ApiProperty({ description: '工作流封面' })
	@IsNotEmpty({ message: '工作流封面 必填' })
	cover: string

	@ApiProperty({
		description: '画布位置',
		example: { width: '100%', height: '100%', scale: 1, offsetX: 0, offsetY: 0, x: 0, y: 0 }
	})
	@IsNotEmpty({ message: '画布位置 必填' })
	core: { width: string; height: string; scale: number; offsetX: number; offsetY: number; x: number; y: number }

	@ApiProperty({ description: '刻度线配置', example: { x: true, y: true } })
	@IsNotEmpty({ message: '刻度线配置 必填' })
	axis: { x: boolean; y: boolean }

	@ApiProperty({ description: '流程块列表', type: () => [IChunk], example: [] })
	column: IChunk[]

	@ApiProperty({ description: '连接线列表', type: () => [IBezier], example: [] })
	line: IBezier[]
}
export class RColumn extends PickType(RCommon, ['page', 'size', 'total']) {
	@ApiProperty({ description: '列表', type: [OmitType(IChart, ['column', 'line'])], example: [] })
	list: IChart[]
}

export class ICreate extends PickType(IChart, ['title', 'cover', 'type', 'status', 'core', 'axis']) {}
export class IUpdate extends PickType(IChart, ['uid', 'title', 'core', 'axis', 'status']) {}
export class IColumn extends PickType(ICommon, ['page', 'size']) {}
export class IOne extends PickType(IChart, ['uid']) {}
