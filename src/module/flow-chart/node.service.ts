import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { CoreService } from '@/core/core.service'
import { EntityService } from '@/core/entity.service'

@Injectable()
export class NodeService extends CoreService {
	constructor(private readonly entity: EntityService) {
		super()
	}

	/**创建节点**/
	public async httpCreateNode() {
		try {
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
