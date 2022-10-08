import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { CoreService } from '@/core/core.service'
import { EntityService } from '@/core/entity.service'
import { RedisService } from '@/core/redis.service'
import * as DTO from './flow-chart.interface'

@Injectable()
export class FlowChartService extends CoreService {
	constructor(private readonly entity: EntityService, private readonly redis: RedisService) {
		super()
	}

	/**创建流程图**/
	public async httpCreateChart(props: DTO.ICreate) {
		try {
			const node = await this.entity.chartModel.create({
				title: props.title,
				status: 1,
				core: props.core ?? {},
				axis: props.axis ?? {}
			})
			await this.entity.chartModel.save(node)
			return { message: '创建成功' }
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**修改流程图**/
	public async httpUpdateChart(props: DTO.IUpdate) {
		try {
			const node = await this.validator({
				message: '流程图',
				empty: true,
				close: true,
				model: this.entity.chartModel,
				options: { where: { uid: props.uid } }
			})
			await this.entity.chartModel.update(
				{ uid: node.uid },
				{
					title: props.title ?? node.title,
					status: props.status ?? node.status,
					core: props.core ?? node.core,
					axis: props.axis ?? node.axis
				}
			)
			return { message: '修改成功' }
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**流程图列表**/
	public async httpColumnChart(props: DTO.IColumn) {
		try {
			const [list = [], total = 0] = await this.entity.chartModel.findAndCount({
				order: { createTime: 'DESC' },
				skip: (props.page - 1) * props.size,
				take: props.size
			})
			await this.redis.setStore('user', { name: '猪头' }, 5)
			return { list, total, page: props.page, size: props.size }
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**流程图信息**/
	public async httpOneChart(props: DTO.IOne) {
		try {
			return this.validator({
				message: '流程图',
				empty: true,
				close: true,
				model: this.entity.chartModel,
				options: {
					where: { uid: props.uid },
					relations: ['chunk', 'bezier']
				}
			})
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
