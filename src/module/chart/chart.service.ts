import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Brackets } from 'typeorm'
import { InitService } from '@/module/init/init.service'
import { ChartEntity } from '@/entity/chart.entity'
import { BlockEntity } from '@/entity/block.entity'
import { BezierEntity } from '@/entity/bezier.entity'
import * as DTO from './chart.interface'

@Injectable()
export class ChartService {
	constructor(private readonly service: InitService) {}

	/**创建流程图**/
	public async httpCreateChart(props: DTO.CreateChart) {
		try {
			const node = await this.service.chartModel.create({
				title: props.title,
				status: 1,
				core: props.core ?? {},
				axis: props.axis ?? {}
			})
			return await this.service.chartModel.save(node)
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**修改流程图**/
	public async httpUpdateChart(props: DTO.UpdateChart) {
		try {
			const node = await this.service.validator({
				message: '流程图',
				empty: true,
				close: true,
				model: this.chartModel,
				options: { where: { uid: props.uid } }
			})
			return await this.chartModel.update(
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
				model: this.chartModel,
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
				model: this.chartModel,
				options: { where: { uid: props.chart } }
			})
			const node = await this.blockModel.create({
				status: 1,
				title: props.title,
				left: props.left,
				top: props.top,
				node: props.node ?? {},
				rules: props.rules ?? [],
				chart
			})
			return await this.blockModel.save(node)
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
				model: this.chartModel,
				options: { where: { uid: props.chart } }
			})
			const node = await this.bezierModel.create({
				status: 1,
				title: props.title,
				source: props.source,
				target: props.target,
				node: props.node ?? {},
				chart
			})
			return await this.bezierModel.save(node)
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
