import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { CommonQuery } from '@/interface/common.interface'
import { IsOptional } from '@/decorator/common.decorator'

export class FileEntity extends PickType(CommonQuery, ['id', 'createTime', 'updateTime']) {
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

	@ApiProperty({ description: '文件类型' })
	suffix: string
}

/**
 * 上传文件
 **/
export class FileCreateResult extends FileEntity {}

/**
 * 文件列表
 **/
export class FileListQuery extends PickType(CommonQuery, ['page', 'size']) {
	@ApiPropertyOptional({ description: '文件类型', example: 'jpg' })
	@IsOptional({}, { string: true, number: true })
	name: string
}

/**
 * 文件类型列表
 **/
export class FileSourceQuery extends PickType(CommonQuery, ['page', 'size']) {}

/**
 * 文件详情
 * 文件类型详情
 **/
export class MatterQuery extends PickType(CommonQuery, ['id']) {}