import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FileEntity } from '@/entity/file.entity'
import { ChartEntity } from '@/entity/chart.entity'
import { ChunkEntity } from '@/entity/chunk.entity'
import { flowChartEntity } from '@/entity/flow-chart.entity'
import { NodeEntity } from '@/entity/flow-chart-node.entity'
import { ColumnEntity } from '@/entity/flow-chart-column.entity'
import { lineEntity } from '@/entity/flow-chart-line.entity'

@Injectable()
export class EntityService {
	constructor(
		@InjectRepository(FileEntity) public readonly fileModel: Repository<FileEntity>,
		@InjectRepository(ChartEntity) public readonly chartModel: Repository<ChartEntity>,
		@InjectRepository(ChunkEntity) public readonly chunkModel: Repository<ChunkEntity>,
		@InjectRepository(lineEntity) public readonly bezierModel: Repository<lineEntity>,
		@InjectRepository(flowChartEntity) public readonly flowChartModel: Repository<flowChartEntity>,
		@InjectRepository(NodeEntity) public readonly nodeModel: Repository<NodeEntity>,
		@InjectRepository(ColumnEntity) public readonly columnModel: Repository<ColumnEntity>
	) {}
}
