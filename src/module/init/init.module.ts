import { Module, Global } from '@nestjs/common'
import { InitService } from './init.service'
import { UploadModule } from '@/module/upload/upload.module'
import { ChartModule } from '@/module/chart/chart.module'

import { TypeOrmModule } from '@nestjs/typeorm'
import { ChartEntity } from '@/entity/chart.entity'
import { BlockEntity } from '@/entity/block.entity'
import { BezierEntity } from '@/entity/bezier.entity'
import { FileEntity } from '@/entity/file.entity'
import { FileSourceEntity } from '@/entity/file.source.entity'

@Global()
@Module({
	imports: [
		TypeOrmModule.forFeature([ChartEntity, BlockEntity, BezierEntity, FileEntity, FileSourceEntity])
		// UploadModule,
		// ChartModule
	],
	providers: [InitService],
	exports: [InitService]
})
export class InitModule {}
