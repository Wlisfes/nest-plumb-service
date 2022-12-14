import { PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, BeforeInsert } from 'typeorm'
import * as day from 'dayjs'
import * as uuid from 'uuid'

export class BaseEntity {
	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@CreateDateColumn({
		comment: '创建时间',
		readonly: true,
		update: false,
		transformer: {
			from: value => day(value).format('YYYY-MM-DD HH:mm:ss'),
			to: value => value
		}
	})
	createTime: Date

	@UpdateDateColumn({
		comment: '修改时间',
		transformer: {
			from: value => day(value).format('YYYY-MM-DD HH:mm:ss'),
			to: value => value
		}
	})
	updateTime: Date
}

export class UEntity extends BaseEntity {
	@BeforeInsert()
	BeforeCreate() {
		this.uid = uuid.v4()
	}

	@Column({ comment: '节点主键', readonly: true })
	uid: string
}
