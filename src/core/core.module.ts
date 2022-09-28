import { Module, Global } from '@nestjs/common'
import { CoreService } from './core.service'
import { EntityService } from './entity.service'
//entity
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChartEntity } from '@/entity/chart.entity'
import { BlockEntity } from '@/entity/block.entity'
import { BezierEntity } from '@/entity/bezier.entity'
import { FileEntity } from '@/entity/file.entity'
//module
import { UploadModule } from '@/module/upload/upload.module'
import { ChartModule } from '@/module/chart/chart.module'

@Global()
@Module({
	imports: [
		TypeOrmModule.forFeature([ChartEntity, BlockEntity, BezierEntity, FileEntity]),
		UploadModule,
		ChartModule
	],
	providers: [CoreService, EntityService],
	exports: [CoreService, EntityService]
})
export class CoreModule {}