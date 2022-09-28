import { Injectable } from '@nestjs/common'
import { CoreService } from '@/core/core.service'
import { EntityService } from '@/core/entity.service'

@Injectable()
export class FlowChartService extends CoreService {
	constructor(private readonly entity: EntityService) {
		super()
	}
}
