import { ApiProperty, PickType, OmitType } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, IsArray, ValidateNested } from 'class-validator'
import { Type, Transform } from 'class-transformer'
import { ICommon } from '@/interface/common.interface'
import { IsOptional } from '@/decorator/common.decorator'
import { toArrayString } from '@/decorator/compute.decorator'

export class INode extends OmitType(ICommon, ['page', 'size']) {
	@ApiProperty({ description: '流程图初始节点UID', example: 'c21b35f3-d8c9-4b96-bdde-386b4fa705ec' })
	@IsNotEmpty({ message: '流程图初始节点UID 必填' })
	uid: string

	@ApiProperty({ description: '流程块标题', example: '电子邮件' })
	@IsNotEmpty({ message: '流程块标题 必填' })
	name: string

	@ApiProperty({ description: '流程块图标' })
	@IsNotEmpty({ message: '流程块图标 必填' })
	icon: string

	@ApiProperty({ description: '删除开关: 0.关闭 1.开启', example: 1 })
	@IsNotEmpty({ message: '删除开关 必填' })
	@IsNumber({}, { message: '删除开关 必须是数字' })
	@Type(type => Number)
	delete: number

	@ApiProperty({ description: '顶层节点: 0.普通节点 1.顶层节点', example: 1 })
	@IsNotEmpty({ message: '顶层节点 必填' })
	@IsNumber({}, { message: '顶层节点 必须是数字' })
	@Type(type => Number)
	root: number

	@ApiProperty({ description: '节点类型: EMAIL、TRIGGER、TARGET、BIND_TASK、AUTO_MATIC、CREATE_TRIGGER' })
	@IsNotEmpty({ message: '节点类型 必填' })
	type: string

	@ApiProperty({ description: '可连接类型列表', type: [String], example: [] })
	@IsOptional({}, { string: true, number: true })
	@Transform(type => toArrayString(type), { toClassOnly: true })
	@IsString({ each: true, message: '分类标签id 必须为Array<number>' })
	connect: string[]

	@ApiProperty({ description: '规则列表', example: [] })
	@IsOptional()
	@IsArray({ message: '规则列表参数错误' })
	@ValidateNested({ each: true, message: '规则列表参数错误' })
	rules: Array<Object>
}

export class ICreate extends PickType(INode, ['uid', 'name', 'icon', 'delete', 'root', 'type', 'connect', 'rules']) {}
export class IUpdate extends PickType(INode, ['uid']) {}
export class IOne extends PickType(INode, ['uid']) {}
