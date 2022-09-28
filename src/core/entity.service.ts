import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FileEntity } from '@/entity/file.entity'
import { ChartEntity } from '@/entity/chart.entity'
import { BlockEntity } from '@/entity/block.entity'
import { BezierEntity } from '@/entity/bezier.entity'

@Injectable()
export class EntityService {
	constructor(
		@InjectRepository(FileEntity) public readonly fileModel: Repository<FileEntity>,
		@InjectRepository(ChartEntity) public readonly chartModel: Repository<ChartEntity>,
		@InjectRepository(BlockEntity) public readonly blockModel: Repository<BlockEntity>,
		@InjectRepository(BezierEntity) public readonly bezierModel: Repository<BezierEntity>
	) {}
}
