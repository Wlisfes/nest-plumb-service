import { Module, Global } from '@nestjs/common'
import { InitService } from './init.service'
import { UploadModule } from '@/module/upload/upload.module'
import { ChartModule } from '@/module/chart/chart.module'

import { TypeOrmModule } from '@nestjs/typeorm'
import { ChartEntity } from '@/entity/chart.entity'
import { BlockEntity } from '@/entity/block.entity'
import { BezierEntity } from '@/entity/bezier.entity'

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([ChartEntity, BlockEntity, BezierEntity]), UploadModule, ChartModule],
	providers: [InitService],
	exports: [InitService]
})
export class InitModule {}
