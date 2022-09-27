import { Entity, Column, OneToMany } from 'typeorm'
import { BaseEntity } from '@/entity/common.entity'
import { FileEntity } from '@/entity/file.entity'

@Entity('file-source')
export class FileSourceEntity extends BaseEntity {
	@Column({ nullable: false, comment: '文件类型' })
	name: string

	@Column({ nullable: true, default: 0, comment: '文件总数' })
	total: number

	@OneToMany(() => FileEntity, type => type.source)
	files: FileEntity[]
}
