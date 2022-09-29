import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import * as express from 'express'
import * as history from 'connect-history-api-fallback'

async function useSwagger(app: NestExpressApplication) {
	const options = new DocumentBuilder()
		.setTitle('Nest-Plumb-Service')
		.setDescription('Nest-Plumb-Service Api Documentation')
		.setVersion('1.0')
		// .addBearerAuth({ type: 'apiKey', name: APP_AUTH_TOKEN, in: 'header' }, APP_AUTH_TOKEN)
		.build()
	const document = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup('api-doc', app, document, {
		customSiteTitle: '流程图服务端API文档',
		swaggerOptions: {
			defaultModelsExpandDepth: -1,
			defaultModelExpandDepth: 5,
			filter: true
		}
	})
	return app
}

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	//允许跨域
	app.enableCors()

	//解析body参数
	app.use(express.json()) // For parsing application/json
	app.use(express.urlencoded({ extended: true }))

	//history路由解决重定向
	// app.use(history())

	//接口前缀
	app.setGlobalPrefix('/api')

	//静态资源
	app.useStaticAssets('public')

	//全局注册验证管道
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true
		})
	)

	//文档挂载
	await useSwagger(app)

	const port = process.env.PORT || 3081
	await app.listen(port)
	console.log(`http://localhost:${port}`)
	console.log(`http://localhost:${port}/api-doc`)
}
bootstrap()
