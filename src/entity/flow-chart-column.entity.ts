import { Entity, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from '@/entity/common.entity'
import { flowChartEntity } from '@/entity/flow-chart.entity'

@Entity('flow-chart-column')
export class ColumnEntity extends BaseEntity {
	@Column({ nullable: false, comment: '流程块UID' })
	uid: string

	@Column({ comment: '状态: ENABLE.启用 DISABLE.禁用', default: 'ENABLE', nullable: false })
	status: string

	@Column({ comment: '左边距', nullable: false, default: '0px' })
	left: string

	@Column({ comment: '上边距', nullable: false, default: '0px' })
	top: string

	@Column('simple-json', { comment: '节点数据', nullable: false })
	current: Record<string, never>

	@Column('simple-json', { comment: '规则列表', nullable: true })
	rules: Array<never>

	@ManyToOne(type => flowChartEntity)
	flow: flowChartEntity
}
