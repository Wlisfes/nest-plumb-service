import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { CoreService } from '@/core/core.service'
import { EntityService } from '@/core/entity.service'
import * as DTO from './flow-chart.interface'

@Injectable()
export class FlowChartService extends CoreService {
	constructor(private readonly entity: EntityService) {
		super()
	}

	/**创建流程图**/
	public async httpChartCreate(props: DTO.IChartCreate) {
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
	public async httpChartUpdate(props: DTO.IChartUpdate) {
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

	/**流程图信息**/
	public async httpOneChart(props: DTO.IChartOne) {
		try {
			return this.validator({
				message: '流程图',
				empty: true,
				close: true,
				model: this.entity.chartModel,
				options: {
					where: { uid: props.uid }
				}
			})
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
