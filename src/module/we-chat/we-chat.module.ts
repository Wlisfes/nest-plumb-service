import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { WeChatService } from './we-chat.service'

@Module({
	imports: [
		HttpModule.register({
			baseURL: 'https://api.weixin.qq.com',
			timeout: 60000
		})
	],
	providers: [WeChatService]
})
export class WeChatModule {}
