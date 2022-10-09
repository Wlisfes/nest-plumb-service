import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'

@Injectable()
export class QueueService {
	constructor(@InjectQueue('cloud-queue') private readonly cloudQueue: Queue) {}

	public async httpCreate() {
		return await this.cloudQueue.add({
			time: Date.now()
		})
	}
}
