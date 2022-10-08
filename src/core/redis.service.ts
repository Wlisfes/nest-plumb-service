import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRedis, Redis } from '@nestjs-modules/ioredis'
import { Observer } from './core.observer'
import * as IoRedis from 'ioredis'

@Injectable()
export class RedisService {
	private done: unknown | undefined
	private readonly observer: Observer<Record<string, unknown>> = new Observer()
	private readonly trigger: Observer<Record<string, unknown>> = new Observer()
	constructor(private readonly config: ConfigService, @InjectRedis() private readonly client: Redis) {
		this.initSubscribe().then(r => Logger.log(r))
	}

	/**初始化订阅消息**/
	private initSubscribe() {
		return new Promise(resilve => {
			try {
				const { client, config, trigger } = this
				const command = `__keyevent@${config.get('REDIS_DB')}__:expired`
				client.send_command('config', ['set', 'notify-keyspace-events', 'Ex'], () => {
					const instance = new IoRedis({
						host: config.get('REDIS_HOST'),
						port: Number(config.get('REDIS_PORT')),
						db: Number(config.get('REDIS_DB')),
						password: config.get('REDIS_PASSWORD'),
						keyPrefix: config.get('REDIS_KEYPREFIX')
					})
					instance.subscribe(command, () => {
						instance.on('message', (cmd, key) => trigger.emit('message', { cmd, key }))
					})
					resilve('Redis: 订阅成功')
				})
			} catch (e) {
				Logger.error('订阅失败: ', e)
			}
		})
	}

	private isCommand(command: string | ((x: string) => boolean), key: string) {
		return (
			(typeof command === 'string' && key.startsWith(command)) || (typeof command === 'function' && command(key))
		)
	}

	public subscribe(
		command: string | ((x: string) => boolean),
		handler?: (e: { cmd: string; key: string }) => void
	): Promise<Observer<Record<string, unknown>>> {
		return new Promise(resolve => {
			const { trigger, observer } = this
			const onTrigger = (e: { cmd: string; key: string }) => {
				if (this.isCommand(command, e.key)) {
					handler?.(e)
					observer.emit('message', e)
				}
			}
			if (!this.done) {
				/**订阅开启**/
				this.done = trigger.on('message', onTrigger)
			}
			resolve(observer)
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
