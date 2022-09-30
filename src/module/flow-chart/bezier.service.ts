import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { CoreService } from '@/core/core.service'
import { EntityService } from '@/core/entity.service'
import * as DTO from './bezier.interface'

@Injectable()
export class BezierService extends CoreService {
	constructor(private readonly entity: EntityService) {
		super()
	}

	/**创建连接线**/
	public async httpCreateBezier(props: DTO.ICreate) {
		try {
			const chart = await this.validator({
				message: '流程图',
				empty: true,
				close: true,
				model: this.entity.chartModel,
				options: { where: { uid: props.chart } }
			})
			const node = await this.entity.bezierModel.create({
				status: 1,
				title: props.title,
				source: props.source,
				target: props.target,
				node: props.node ?? {},
				chart
			})
			await this.entity.bezierModel.save(node)
			return { message: '创建成功' }
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**修改连接线**/
	public async httpUpdateBezier(props: DTO.IUpdate) {
		try {
			const node = await this.validator({
				message: '连接线',
				empty: true,
				close: true,
				model: this.entity.bezierModel,
				options: { where: { uid: props.uid } }
			})
			await this.entity.bezierModel.update(
				{ uid: node.uid },
				{
					title: props.title ?? node.title,
					source: props.source ?? node.source,
					target: props.target ?? node.target,
					node: props.node ?? node.node ?? {}
				}
			)
			return { message: '修改成功' }
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**连接线信息**/
	public async httpOneBezier(props: DTO.IOne) {
		try {
			return this.validator({
				message: '连接线',
				empty: true,
				close: true,
				model: this.entity.bezierModel,
				options: {
					where: { uid: props.uid },
					relations: ['chart']
				}
			})
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
