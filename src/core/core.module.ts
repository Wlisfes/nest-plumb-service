import { Module, Global } from '@nestjs/common'
import { CoreService } from './core.service'
import { EntityService } from './entity.service'
import { RedisService } from './redis.service'
//entity
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChartEntity } from '@/entity/chart.entity'
import { ChunkEntity } from '@/entity/chunk.entity'
import { BezierEntity } from '@/entity/bezier.entity'
import { FileEntity } from '@/entity/file.entity'
//module
import { UploadModule } from '@/module/upload/upload.module'
import { FlowChartModule } from '@/module/flow-chart/flow-chart.module'
import { WeChatModule } from '@/module/we-chat/we-chat.module'

@Global()
@Module({
	imports: [
		TypeOrmModule.forFeature([ChartEntity, ChunkEntity, BezierEntity, FileEntity]),
		UploadModule,
		FlowChartModule,
		WeChatModule
	],
	providers: [CoreService, EntityService, RedisService],
	exports: [CoreService, EntityService, RedisService]
})
export class CoreModule {}
