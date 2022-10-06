import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { CoreService } from '@/core/core.service'
import { EntityService } from '@/core/entity.service'
import { RedisService } from '@/core/redis.service'

@Injectable()
export class WeChatService extends CoreService {
	constructor(
		private readonly configService: ConfigService,
		private readonly httpService: HttpService,
		private readonly entity: EntityService,
		private readonly redis: RedisService
	) {
		super()
	}

	/**获取小程序凭证**/
	public async httpAccessToken() {
		try {
			return await this.httpService.axiosRef.request({
				url: `/cgi-bin/token`,
				method: 'GET',
				params: {
					grant_type: 'client_credential',
					appid: this.configService.get('APP_ID'),
					secret: this.configService.get('APP_SECRET')
				}
			})
		} catch (e) {
			console.log(e)
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
		// try {
		// 	const token = await this.redis.getStore('access-token')
		// 	if (!token) {
		// 		const data = await this.httpService.request({
		// 			url: `/cgi-bin/token`,
		// 			method: 'GET',
		// 			params: {
		// 				grant_type: 'client_credential',
		// 				appid: this.configService.get('APP_ID'),
		// 				secret: this.configService.get('APP_SECRET')
		// 			}
		// 		})

		// 		await this.redis.setStore('access-token', data, 115 * 60)
		// 		return data
		// 	}
		// 	return token
		// } catch (e) {
		// 	throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		// }
	}
}
