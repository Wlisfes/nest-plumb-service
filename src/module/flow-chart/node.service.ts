import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
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
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
