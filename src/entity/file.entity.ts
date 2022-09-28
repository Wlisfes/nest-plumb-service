import { Entity, Column } from 'typeorm'
import { BaseEntity } from '@/entity/common.entity'

@Entity('file')
export class FileEntity extends BaseEntity {
	@Column({ nullable: false, comment: '文件路径' })
	path: string

	@Column({ nullable: false, comment: '原始文件名' })
	name: string

	@Column({ nullable: false, comment: '文件重命名' })
	rename: string

	@Column({ nullable: false, comment: '文件类型' })
	suffix: string

	@Column({ comment: '状态: 0.关闭 1.开启', default: 1, nullable: false })
	status: number

	@Column({ nullable: true, default: 0, comment: '文件size' })
	size: number
}
