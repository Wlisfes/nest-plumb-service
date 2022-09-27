import { Module } from '@nestjs/common'
import { SCompute } from './compute.service'
//entity
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChartEntity } from '@/entity/chart.entity'
import { BlockEntity } from '@/entity/block.entity'
import { BezierEntity } from '@/entity/bezier.entity'

@Module({
	imports: [TypeOrmModule.forFeature([ChartEntity, BlockEntity, BezierEntity])],
	providers: [SCompute],
	exports: [SCompute]
})
export class MCompute {}
