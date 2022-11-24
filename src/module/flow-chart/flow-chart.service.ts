import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { v4 } from 'uuid'
import { CoreService } from '@/core/core.service'
import { EntityService } from '@/core/entity.service'
import * as HTTP from './flow-chart.interface'

@Injectable()
export class FlowChartService extends CoreService {
	constructor(private readonly entity: EntityService) {
		super()
	}

	/**创建工作流**/
	public async httpCreateChart(props: HTTP.ICreate) {
		try {
			const node = await this.entity.flowChartModel.create({
				uid: v4(),
				title: props.title,
				type: props.type,
				cover: props.cover,
				status: props.status,
				core: props.core,
				axis: props.axis
			})
			await this.entity.flowChartModel.save(node)
			return { message: '创建成功' }
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**修改流程图**/
	// public async httpUpdateChart(props: HTTP.IUpdate) {
	// 	try {
	// 		const node = await this.validator({
	// 			message: '流程图',
	// 			empty: true,
	// 			close: true,
	// 			model: this.entity.chartModel,
	// 			options: { where: { uid: props.uid } }
	// 		})
	// 		await this.entity.chartModel.update(
	// 			{ uid: node.uid },
	// 			{
	// 				title: props.title ?? node.title,
	// 				// status: props.status ?? node.status,
	// 				core: props.core ?? node.core,
	// 				axis: props.axis ?? node.axis
	// 			}
	// 		)
	// 		return { message: '修改成功' }
	// 	} catch (e) {
	// 		throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
	// 	}
	// }

	/**工作流列表**/
	public async httpColumnChart(props: HTTP.IColumn) {
		try {
			const [list = [], total = 0] = await this.entity.flowChartModel.findAndCount({
				order: { createTime: 'DESC' },
				skip: (props.page - 1) * props.size,
				take: props.size
			})
			return { list, total, page: props.page, size: props.size }
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**流程图信息**/
	public async httpOneChart(props: HTTP.IOne) {
		try {
			console.log(props)
			return this.validator({
				message: '流程图',
				empty: true,
				close: true,
				model: this.entity.flowChartModel,
				options: {
					where: { uid: props.uid },
					relations: ['column', 'line']
				}
			})
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
