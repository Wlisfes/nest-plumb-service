import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { CoreService } from '@/core/core.service'
import { EntityService } from '@/core/entity.service'
import * as DTO from './flow-chart.interface'

@Injectable()
export class ChunkService extends CoreService {
	constructor(private readonly entity: EntityService) {
		super()
	}

	/**创建节点块**/
	public async httpChunkCreate(props: DTO.IChunkCreate) {
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
				left: props.left ?? '0px',
				top: props.top ?? '0px',
				node: props.node ?? {},
				rules: props.rules ?? [],
				chart
			})
			await this.entity.chunkModel.save(node)
			return { message: '创建成功' }
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**修改节点块**/
	public async httpChunkUpdate(props: DTO.IChunkUpdate) {
		try {
			const node = await this.validator({
				message: '节点块',
				empty: true,
				close: true,
				model: this.entity.chunkModel,
				options: { where: { uid: props.uid } }
			})
			await this.entity.chunkModel.update(
				{ uid: node.uid },
				{
					title: props.title ?? node.title,
					left: props.left ?? node.left,
					top: props.top ?? node.top,
					node: props.node ?? node.node ?? {},
					rules: props.rules ?? node.rules ?? []
				}
			)
			return { message: '修改成功' }
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**节点块信息**/
	public async httpOneChunk(props: DTO.IChunkOne) {
		try {
			return this.validator({
				message: '节点块',
				empty: true,
				close: true,
				model: this.entity.chunkModel,
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
