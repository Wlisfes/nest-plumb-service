import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRedis, Redis } from '@nestjs-modules/ioredis'
import { Observer } from './core.observer'
import * as IoRedis from 'ioredis'

@Injectable()
export class RedisService {
	private current: string | undefined = undefined
	private readonly observer: Observer<Record<string, unknown>> = new Observer()
	constructor(private readonly config: ConfigService, @InjectRedis() private readonly client: Redis) {}

	private isCurrent(value: string): boolean {
		return this.current === value
	}

	public subscribe(inc: string | ((x: string) => boolean)): Promise<Observer<Record<string, unknown>>> {
		return new Promise((resolve, reject) => {
			try {
				const { client, config, observer } = this
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
							if (this.isCurrent(key) && typeof inc === 'string' && key.startsWith(inc)) {
								observer.emit('message', { cmd, key })
							} else if (this.isCurrent(key) && typeof inc === 'function' && inc(key)) {
								observer.emit('message', { cmd, key })
							}
							this.current = key
						})
					})
				})
				resolve(observer)
			} catch (e) {
				reject(e)
			}
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
