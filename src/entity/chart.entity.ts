import { Entity, Column, OneToMany } from 'typeorm'
import { UEntity } from '@/entity/common.entity'
import { ChunkEntity } from '@/entity/chunk.entity'
import { BezierEntity } from '@/entity/bezier.entity'

@Entity('chart')
export class ChartEntity extends UEntity {
	@Column({ nullable: false, comment: '流程图标题' })
	title: string

	@Column({ comment: '状态: 0.关闭 1.开启', default: 1, nullable: false })
	status: number

	@Column('simple-json', {
		comment: '画布位置配置',
		nullable: false
		// default: `{ width: '100%', height: '100%', scale: 1, offsetX: 0, offsetY: 0, x: 0, y: 0 }`
	})
	core: Object

	@Column('simple-json', {
		comment: '刻度线配置',
		nullable: false
		// default: `{ x: true, y: true }`
	})
	axis: Object

	@OneToMany(() => ChunkEntity, type => type.chart)
	chunk: ChunkEntity[]

	@OneToMany(() => BezierEntity, type => type.chart)
	bezier: BezierEntity[]
}
