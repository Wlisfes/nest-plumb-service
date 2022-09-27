import { Entity, Column, ManyToOne } from 'typeorm'
import { UEntity } from '@/entity/common.entity'
import { ChartEntity } from '@/entity/chart.entity'

@Entity('bezier')
export class BezierEntity extends UEntity {
	@Column({ nullable: false, comment: '连接线标题' })
	title: string

	@Column({ comment: '状态: 0.关闭 1.开启', default: 1, nullable: false })
	status: number

	@Column({ comment: '起点', nullable: false })
	source: string

	@Column({ comment: '终点', nullable: false })
	target: string

	@Column('simple-json', { comment: '节点数据', nullable: false })
	node: Object

	@ManyToOne(type => ChartEntity)
	chart: ChartEntity
}
