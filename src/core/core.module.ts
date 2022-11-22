import { Module, Global } from '@nestjs/common'
//service
import { CoreService } from './core.service'
import { EntityService } from './entity.service'
import { RedisService } from './redis.service'
//entity
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChartEntity } from '@/entity/chart.entity'
import { ChunkEntity } from '@/entity/chunk.entity'
import { BezierEntity } from '@/entity/bezier.entity'
import { FileEntity } from '@/entity/file.entity'
import { flowChartEntity } from '@/entity/flow-chart.entity'
import { ColumnEntity } from '@/entity/flow-chart-column.entity'
import { lineEntity } from '@/entity/flow-chart-line.entity'
//module
import { QueueModule } from '@/module/queue/queue.module'
import { DispatchModule } from '@/module/dispatch/dispatch.module'
import { UploadModule } from '@/module/upload/upload.module'
import { FlowChartModule } from '@/module/flow-chart/flow-chart.module'
import { WeChatModule } from '@/module/we-chat/we-chat.module'

@Global()
@Module({
	imports: [
		TypeOrmModule.forFeature([
			ChartEntity,
			ChunkEntity,
			BezierEntity,
			FileEntity,
			flowChartEntity,
			ColumnEntity,
			lineEntity
		]),
		QueueModule,
		DispatchModule,
		UploadModule,
		FlowChartModule,
		WeChatModule
	],
	providers: [CoreService, EntityService, RedisService],
	exports: [CoreService, EntityService, RedisService]
})
export class CoreModule {}
