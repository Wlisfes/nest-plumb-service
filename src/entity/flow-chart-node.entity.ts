import { Entity, Column } from 'typeorm'
import { BaseEntity } from '@/entity/common.entity'

@Entity('flow-chart-node')
export class NodeEntity extends BaseEntity {
	@Column({ nullable: false, comment: '流程图初始节点UID' })
	uid: string

	@Column({ nullable: false, comment: '流程块标题' })
	name: string

	@Column({ nullable: false, comment: '流程块图标' })
	icon: string

	@Column({ comment: '状态: ENABLE.启用 DISABLE.禁用', default: 'ENABLE', nullable: false })
	status: string

	@Column({ comment: '最大连接数: -1.不限制 0.关闭 1.连接数', default: -1, nullable: false })
	max: number

	@Column({ comment: '删除开关: 0.关闭 1.开启', default: 1, nullable: false })
	delete: number

	@Column({ comment: '顶层节点: 0.普通节点 1.顶层节点', default: 0, nullable: false })
	root: number

	@Column({ comment: '节点类型: EMAIL、TRIGGER、TARGET、BIND_TASK、AUTO_MATIC、CREATE_TRIGGER', nullable: false })
	type: string

	@Column('simple-array', { comment: '可连接类型列表', nullable: true })
	connect: string[]

	@Column('simple-array', { comment: '规则列表', nullable: true })
	rules: Array<Object>
}
