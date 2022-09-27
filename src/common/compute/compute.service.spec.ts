import { Test, TestingModule } from '@nestjs/testing'
import { Compute } from './compute.service'

describe('ComputeService', () => {
	let service: Compute

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [Compute]
		}).compile()

		service = module.get<Compute>(Compute)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
