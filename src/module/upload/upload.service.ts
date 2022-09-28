import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Brackets } from 'typeorm'
import { isEmpty } from 'class-validator'
import { CoreService } from '@/core/core.service'
import { EntityService } from '@/core/entity.service'
import * as DTO from './upload.interface'

@Injectable()
export class UploadService extends CoreService {
	constructor(private readonly entity: EntityService) {
		super()
	}

	/**上传文件**/
	public async fileCreate(files: Array<Express.Multer.File>) {
		try {
			if (files.length === 0) {
				throw new HttpException('File 不能为空', HttpStatus.BAD_REQUEST)
			} else {
				const response = []
				while (files.length) {
					const item = files.shift()
					const suffix = item.originalname.split('.').pop()?.toLowerCase()
					const newFile = await this.entity.fileModel.create({
						name: item.originalname,
						rename: item.filename,
						size: item.size,
						path: `${item.destination.replace('./public', '')}/${item.filename}`,
						suffix: suffix
					})
					const saveFile = await this.entity.fileModel.save(newFile)
					response.push(saveFile)
				}
				return response
			}
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**文件列表**/
	public async fileColumn(props: DTO.IColumn) {
		try {
			const [list = [], total = 0] = await this.entity.fileModel
				.createQueryBuilder('t')
				.where(
					new Brackets(Q => {
						if (!isEmpty(props.suffix)) {
							Q.andWhere('t.suffix = :suffix', { suffix: props.suffix })
						}
					})
				)
				.skip((props.page - 1) * props.size)
				.take(props.size)
				.getManyAndCount()
			return { list, total }
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**文件详情**/
	public async fileOne(props: DTO.IOne) {
		try {
			return await this.validator({
				message: '文件',
				empty: true,
				close: true,
				model: this.entity.fileModel,
				options: { where: { id: props.id } }
			})
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
