import { Entity, Column, ManyToOne } from 'typeorm'
import { UEntity } from '@/entity/common.entity'
import { flowChartEntity } from '@/entity/flow-chart.entity'

@Entity('flow-chart-column')
export class ColumnEntity extends UEntity {
	@Column({ nullable: false, comment: '流程块UID' })
	uid: string

	@Column({ nullable: false, comment: '流程块标题' })
	name: string

	@Column({ comment: '状态: 0.关闭 1.开启', default: 1, nullable: false })
	status: number

	@Column({ comment: '左边距', nullable: false, default: '0px' })
	left: string

	@Column({ comment: '上边距', nullable: false, default: '0px' })
	top: string

	@Column({ comment: '删除开关: 0.关闭 1.开启', default: 1, nullable: false })
	delete: number

	@Column({ comment: '顶层节点: 0.普通节点 1.顶层节点', default: 0, nullable: false })
	root: number

	@Column('simple-json', { comment: '节点数据', nullable: false })
	current: Object

	@Column('simple-array', { comment: '规则列表', nullable: true })
	rules: Array<Object>

	@ManyToOne(type => flowChartEntity)
	flow: flowChartEntity
}
