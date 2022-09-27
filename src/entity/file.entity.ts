import { Entity, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from '@/entity/common.entity'
import { FileSourceEntity } from '@/entity/file.source.entity'

@Entity('file')
export class FileEntity extends BaseEntity {
	@Column({ nullable: false, comment: '文件路径' })
	path: string

	@Column({ nullable: false, comment: '原始文件名' })
	old_name: string

	@Column({ nullable: false, comment: '文件重命名' })
	new_name: string

	@Column({ comment: '状态: 0.关闭 1.开启', default: 1, nullable: false })
	status: number

	@Column({ nullable: true, default: 0, comment: '文件size' })
	size: number

	@ManyToOne(() => FileSourceEntity, type => type.files)
	source: FileSourceEntity
}
