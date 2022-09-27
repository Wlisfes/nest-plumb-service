import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { diskStorage } from 'multer'
import { FileEntity } from '@/entity/file.entity'
import { FileSourceEntity } from '@/entity/file.source.entity'
import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'
import * as path from 'path'

@Module({
	imports: [
		TypeOrmModule.forFeature([FileEntity, FileSourceEntity]),
		MulterModule.register({
			storage: diskStorage({
				destination: (req, file, cb) => {
					const name = path.extname(file.originalname).toLowerCase()
					if (['.jpg', '.png', '.gif', '.webp'].includes(name)) {
						return cb(null, './public/upload/image')
					} else {
						return cb(null, './public/upload/other')
					}
				},
				filename: (req, file, cb) => {
					return cb(null, Date.now() + path.extname(file.originalname).toLowerCase())
				}
			})
		})
	],
	controllers: [UploadController],
	providers: [UploadService]
})
export class UploadModule {}
