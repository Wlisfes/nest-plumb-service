import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { v4 } from 'uuid'
import { CoreService } from '@/core/core.service'
import { EntityService } from '@/core/entity.service'
import * as HTTP from './column.interface'

@Injectable()
export class ColumnService extends CoreService {
	constructor(private readonly entity: EntityService) {
		super()
	}

	/**创建节点块**/
	public async httpCreateColumn(props: HTTP.ICreate) {
		try {
			const flow = await this.validator({
				message: '流程图',
				empty: true,
				close: true,
				model: this.entity.flowChartModel,
				options: { where: { uid: props.flow } }
			})
			const node = await this.entity.columnModel.create({
				uid: props.uid,
				left: props.left,
				top: props.top,
				current: props.current as Record<string, never>,
				rules: props.rules as Array<never>,
				flow
			})
			await this.entity.columnModel.save(node)
			return { message: '创建成功' }
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**修改节点块**/
	public async httpUpdateColumn(props: HTTP.IUpdate) {
		try {
			const node = await this.validator({
				message: '节点块',
				empty: true,
				close: true,
				model: this.entity.columnModel,
				options: { where: { uid: props.uid } }
			})
			await this.entity.columnModel.update({ uid: node.uid }, { left: props.left, top: props.top })
			return { message: '修改成功' }
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
