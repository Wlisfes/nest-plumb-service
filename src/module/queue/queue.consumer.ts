import { Processor, Process } from '@nestjs/bull'
import { Job } from 'bull'

@Processor('cloud-queue')
export class CloudConsumer {
	@Process()
	async transcode(job: Job<unknown>) {
		console.log(job)
	}
}
