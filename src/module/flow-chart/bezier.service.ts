import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { CoreService } from '@/core/core.service'
import { EntityService } from '@/core/entity.service'
import { RedisService } from '@/core/redis.service'
import * as DTO from './bezier.interface'

@Injectable()
export class BezierService extends CoreService {
	constructor(private readonly entity: EntityService, private readonly redis: RedisService) {
		super()
	}

	/**创建连接线**/
	public async httpCreateBezier(props: DTO.ICreate) {
		try {
			const flow = await this.validator({
				message: '流程图',
				empty: true,
				close: true,
				model: this.entity.flowChartModel,
				options: { where: { uid: props.flow } }
			})
			const node = await this.entity.bezierModel.create({
				uid: props.uid,
				parent: props.parent,
				source: props.source,
				target: props.target,
				label: props.label ?? Date.now().toString(),
				flow
			})
			await this.entity.bezierModel.save(node)
			return { message: '创建成功' }
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
