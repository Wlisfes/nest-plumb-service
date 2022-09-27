import { Entity, Column, ManyToOne } from 'typeorm'
import { UEntity } from '@/entity/common.entity'
import { ChartEntity } from '@/entity/chart.entity'

@Entity('block')
export class BlockEntity extends UEntity {
	@Column({ nullable: false, comment: '流程块标题' })
	title: string

	@Column({ comment: '状态: 0.关闭 1.开启', default: 1, nullable: false })
	status: number

	@Column({ comment: '左边距', nullable: false, default: '0px' })
	left: string

	@Column({ comment: '上边距', nullable: false, default: '0px' })
	top: string

	@Column('simple-json', { comment: '节点数据', nullable: false })
	node: Object

	@Column('simple-array', { comment: '规则列表', nullable: true })
	rules: Array<Object>

	@ManyToOne(type => ChartEntity)
	chart: ChartEntity
}
