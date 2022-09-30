import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRedis, Redis } from '@nestjs-modules/ioredis'
import { Observer } from './core.observer'
import * as IoRedis from 'ioredis'

@Injectable()
export class RedisService {
	public readonly observer: Observer<Record<string, unknown>> = new Observer()
	constructor(private readonly config: ConfigService, @InjectRedis() private readonly client: Redis) {}

	public subscribe() {
		const { client, config } = this
		const command = `__keyevent@${this.config.get('REDIS_DB')}__:expired`
		client.send_command('config', ['set', 'notify-keyspace-events', 'Ex'], () => {
			const instance = new IoRedis({
				host: config.get('REDIS_HOST'),
				port: Number(config.get('REDIS_PORT')),
				db: Number(config.get('REDIS_DB')),
				password: config.get('REDIS_PASSWORD'),
				keyPrefix: config.get('REDIS_KEYPREFIX')
			})
			instance.subscribe(command, () => {
				instance.on('message', (cmd, key) => {
					this.observer.emit('message', { cmd, key })
				})
			})
		})
	}

	public async setStore(key: string, data: any, seconds?: number) {
		if (!seconds) {
			return await this.client.set(key, JSON.stringify(data))
		} else {
			return await this.client.set(key, JSON.stringify(data), 'EX', seconds)
		}
	}

	public async getStore(key: string) {
		const data = await this.client.get(key)
		return data ? JSON.parse(data) : undefined
	}
}
