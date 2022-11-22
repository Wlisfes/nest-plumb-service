import { Entity, Column, OneToMany } from 'typeorm'
import { UEntity } from '@/entity/common.entity'
import { lineEntity } from '@/entity/flow-chart-line.entity'
import { ColumnEntity } from '@/entity/flow-chart-column.entity'

@Entity('flow-chart')
export class flowChartEntity extends UEntity {
	@Column({ nullable: false, comment: '流程图标题' })
	title: string

	@Column({ comment: '状态: 0.关闭 1.开启', default: 1, nullable: false })
	status: number

	@Column('simple-json', { comment: '画布位置配置', nullable: false })
	core: Object

	@Column('simple-json', { comment: '刻度线配置', nullable: false })
	axis: Object

	@OneToMany(() => ColumnEntity, type => type.flow)
	column: ColumnEntity[]

	@OneToMany(() => lineEntity, type => type.flow)
	line: lineEntity[]
}
