import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Brackets } from 'typeorm'
import { isEmpty } from 'class-validator'
import { CoreService } from '@/core/core.service'
import { EntityService } from '@/core/entity.service'
import * as DTO from './chart.interface'

@Injectable()
export class ChartService extends CoreService {
	constructor(private readonly entity: EntityService) {
		super()
	}

	/**创建流程图**/
	public async httpCreateChart(props: DTO.CreateChart) {
		try {
			const node = await this.entity.chartModel.create({
				title: props.title,
				status: 1,
				core: props.core ?? {},
				axis: props.axis ?? {}
			})
			return await this.entity.chartModel.save(node)
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**修改流程图**/
	public async httpUpdateChart(props: DTO.UpdateChart) {
		try {
			const node = await this.validator({
				message: '流程图',
				empty: true,
				close: true,
				model: this.entity.chartModel,
				options: { where: { uid: props.uid } }
			})
			return await this.entity.chartModel.update(
				{ id: node.id },
				{
					title: props.title ?? node.title,
					status: props.status ?? node.status,
					core: props.core ?? node.core,
					axis: props.axis ?? node.axis
				}
			)
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**流程图信息**/
	public async httpOneChart(props) {
		try {
			return this.validator({
				message: '流程图',
				empty: true,
				close: true,
				model: this.entity.chartModel,
				options: {
					where: { uid: props.uid },
					relations: ['column', 'bezier']
				}
			})
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**创建节点块**/
	public async httpCreateColumn(props) {
		try {
			const chart = await this.validator({
				message: '流程图',
				empty: true,
				close: true,
				model: this.entity.chartModel,
				options: { where: { uid: props.chart } }
			})
			const node = await this.entity.chunkModel.create({
				status: 1,
				title: props.title,
				left: props.left,
				top: props.top,
				node: props.node ?? {},
				rules: props.rules ?? [],
				chart
			})
			return await this.entity.chunkModel.save(node)
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**创建连接线**/
	public async httpCreateBezier(props) {
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
			return await this.entity.bezierModel.save(node)
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
