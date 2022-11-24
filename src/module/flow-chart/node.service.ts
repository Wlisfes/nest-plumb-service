import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { v4 } from 'uuid'
import { CoreService } from '@/core/core.service'
import { EntityService } from '@/core/entity.service'
import * as HTTP from './node.interface'

@Injectable()
export class NodeService extends CoreService {
	constructor(private readonly entity: EntityService) {
		super()
	}

	/**创建节点**/
	public async httpCreateNode(props: HTTP.ICreate) {
		try {
			const node = await this.entity.nodeModel.create({
				uid: v4(),
				name: props.name,
				icon: props.icon,
				type: props.type,
				connect: props.connect ?? [],
				delete: props.delete,
				root: props.root,
				max: props.max,
				status: props.status,
				rules: props.rules.map(x => ({ ...x, uid: x.uid ?? v4() })) as Array<never>
			})
			await this.entity.nodeModel.save(node)
			return { message: '创建成功' }
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**节点列表**/
	public async httpColumnNode(props: HTTP.IColumn) {
		try {
			const [list = [], total = 0] = await this.entity.nodeModel.findAndCount({
				order: { createTime: 'DESC' },
				skip: (props.page - 1) * props.size,
				take: props.size
			})
			return { ...props, list, total }
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
