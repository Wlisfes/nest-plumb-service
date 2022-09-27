import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChartController } from './chart.controller'
import { ChartService } from './chart.service'
import { ChartEntity } from '@/entity/chart.entity'
import { BlockEntity } from '@/entity/block.entity'
import { BezierEntity } from '@/entity/bezier.entity'

@Module({
	imports: [TypeOrmModule.forFeature([ChartEntity, BlockEntity, BezierEntity])],
	controllers: [ChartController],
	providers: [ChartService]
})
export class ChartModule {}
