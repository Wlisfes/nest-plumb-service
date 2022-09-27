import { Controller, Post, Get, Query, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiConsumes, ApiProduces, ApiResponse } from '@nestjs/swagger'
import { AnyFilesInterceptor } from '@nestjs/platform-express'
import { UploadService } from './upload.service'
import { ApiMultipleFile } from '@/decorator/file.decorator'
import * as DTO from './upload.interface'

@ApiTags('文件模块')
@Controller('upload')
export class UploadController {
	constructor(private readonly uploadService: UploadService) {}

	@ApiOperation({ summary: '上传文件' })
	@ApiMultipleFile()
	@Post('/file-create')
	@UseInterceptors(AnyFilesInterceptor())
	@ApiResponse({ status: 200, description: 'OK', type: [DTO.FileCreateResult] })
	public async FileCreate(@UploadedFiles() files: Array<Express.Multer.File> = []) {
		return await this.uploadService.FileCreate(files)
	}

	@ApiOperation({ summary: '文件列表' })
	@ApiConsumes('application/x-www-form-urlencoded', 'application/json')
	@ApiProduces('application/json', 'application/xml')
	@Get('/file-list')
	public async FileList(@Query() query: DTO.FileListQuery) {
		return await this.uploadService.FileList(query)
	}

	@ApiOperation({ summary: '文件类型列表' })
	@ApiConsumes('application/x-www-form-urlencoded', 'application/json')
	@ApiProduces('application/json', 'application/xml')
	@Get('/file-source')
	public async FileSource(@Query() query: DTO.FileSourceQuery) {
		return await this.uploadService.FileSource(query)
	}

	@ApiOperation({ summary: '文件详情' })
	@ApiConsumes('application/x-www-form-urlencoded', 'application/json')
	@ApiProduces('application/json', 'application/xml')
	@Get('/file-matter')
	public async FileMatter(@Query() query: DTO.MatterQuery) {
		return await this.uploadService.FileMatter(query)
	}

	@ApiOperation({ summary: '文件类型详情' })
	@ApiConsumes('application/x-www-form-urlencoded', 'application/json')
	@ApiProduces('application/json', 'application/xml')
	@Get('/source-matter')
	public async SourceMatter(@Query() query: DTO.MatterQuery) {
		return await this.uploadService.SourceMatter(query)
	}

	@ApiOperation({ summary: '文件鉴权' })
	@ApiConsumes('application/x-www-form-urlencoded', 'application/json')
	@ApiProduces('application/json', 'application/xml')
	@Get('/file-auth')
	public async FileAuth(@Query() query: DTO.FileAuthQuery) {
		return await this.uploadService.FileAuth(query)
	}
}
