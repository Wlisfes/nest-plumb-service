import { Controller, Post, Get, Query, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AnyFilesInterceptor } from '@nestjs/platform-express'
import { ApiCompute } from '@/decorator/compute.decorator'
import { UploadService } from './upload.service'
import { ApiMultipleFile } from '@/decorator/file.decorator'
import * as DTO from './upload.interface'

@ApiTags('文件模块')
@Controller('upload')
export class UploadController {
	constructor(private readonly uploadService: UploadService) {}

	@Post('/file-create')
	@ApiMultipleFile()
	@UseInterceptors(AnyFilesInterceptor())
	@ApiCompute({
		operation: { summary: '上传文件' },
		response: { status: 200, description: 'OK', type: DTO.IUpload }
	})
	public async fileCreate(@UploadedFiles() files: Array<Express.Multer.File> = []) {
		return await this.uploadService.fileCreate(files)
	}

	@Get('/file-column')
	@ApiCompute({
		operation: { summary: '文件列表' },
		response: { status: 200, description: 'OK', type: DTO.RColumn }
	})
	public async fileColumn(@Query() query: DTO.IColumn) {
		return await this.uploadService.fileColumn(query)
	}

	@Get('/file-one')
	@ApiCompute({
		operation: { summary: '文件详情' },
		response: { status: 200, description: 'OK', type: DTO.IUpload }
	})
	public async fileOne(@Query() query: DTO.IOne) {
		return await this.uploadService.fileOne(query)
	}
}
