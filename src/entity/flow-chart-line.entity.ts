import { Entity, Column, ManyToOne } from 'typeorm'
import { UEntity } from '@/entity/common.entity'
import { flowChartEntity } from '@/entity/flow-chart.entity'

@Entity('flow-chart-line')
export class lineEntity extends UEntity {
	@Column({ nullable: false, comment: '连接线UID' })
	uid: string

	@Column({ nullable: false, comment: '连接线标题' })
	label: string

	@Column({ comment: '状态: 0.关闭 1.开启', default: 1, nullable: false })
	status: number

	@Column({ comment: '起点块节点UID', nullable: false })
	parent: string

	@Column({ comment: '起点规则点UID', nullable: false })
	source: string

	@Column({ comment: '终点块节点UID', nullable: false })
	target: string

	@ManyToOne(type => flowChartEntity)
	flow: flowChartEntity
}
