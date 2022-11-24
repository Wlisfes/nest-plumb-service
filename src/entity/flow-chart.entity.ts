import { Entity, Column, OneToMany } from 'typeorm'
import { BaseEntity } from '@/entity/common.entity'
import { lineEntity } from '@/entity/flow-chart-line.entity'
import { ColumnEntity } from '@/entity/flow-chart-column.entity'

@Entity('flow-chart')
export class flowChartEntity extends BaseEntity {
	@Column({ nullable: false, comment: '工作流UID' })
	uid: string

	@Column({ nullable: false, comment: '工作流标题' })
	title: string

	@Column({ comment: '工作流封面', nullable: false })
	cover: string

	@Column({ comment: '工作流类型: BIND_TASK、AUTO_MATIC、CREATE_TRIGGER', nullable: false })
	type: string

	@Column({ comment: '状态: ENABLE.启用 DISABLE.禁用', default: 'ENABLE', nullable: false })
	status: string

	@Column('simple-json', {
		comment: '画布位置配置',
		nullable: false,
		transformer: {
			from: value => JSON.parse(value),
			to: value => value
		}
	})
	core: { width: string; height: string; scale: number; offsetX: number; offsetY: number; x: number; y: number }

	@Column('simple-json', {
		comment: '刻度线配置',
		nullable: false,
		transformer: {
			from: value => JSON.parse(value),
			to: value => value
		}
	})
	axis: { x: boolean; y: boolean }

	@OneToMany(() => ColumnEntity, type => type.flow)
	column: ColumnEntity[]

	@OneToMany(() => lineEntity, type => type.flow)
	line: lineEntity[]
}
