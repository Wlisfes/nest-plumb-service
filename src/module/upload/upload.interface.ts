import { ApiProperty, ApiPropertyOptional, PickType, IntersectionType } from '@nestjs/swagger'
import { ICommon, RCommon } from '@/interface/common.interface'
import { IsOptional } from '@/decorator/common.decorator'

export class IUpload extends PickType(ICommon, ['id', 'createTime', 'updateTime']) {
	@ApiProperty({ description: '文件路径' })
	path: string

	@ApiProperty({ description: '原始文件名' })
	name: string

	@ApiProperty({ description: '文件重命名' })
	rename: string

	@ApiProperty({ description: '状态: 0.关闭 1.开启', enum: [0, 1], example: 1 })
	status: number

	@ApiProperty({ description: '文件size' })
	size: string

	@ApiProperty({ description: '文件类型', example: 'jpg' })
	@IsOptional({}, { string: true, number: true })
	suffix: string
}
export class RUoload extends PickType(RCommon, ['page', 'size', 'total']) {
	@ApiProperty({ description: '列表', type: [IUpload], example: [] })
	list: IUpload[]
}

export class IOne extends PickType(ICommon, ['id']) {}
export class IColumn extends IntersectionType(PickType(IUpload, ['suffix']), PickType(ICommon, ['page', 'size'])) {}
