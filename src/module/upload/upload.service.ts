import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Brackets } from 'typeorm'
import { isEmpty } from 'class-validator'
import { SCompute } from '@/common/compute/compute.service'
import { FileEntity } from '@/entity/file.entity'
import { FileSourceEntity } from '@/entity/file.source.entity'
import * as DTO from './upload.interface'

@Injectable()
export class UploadService extends SCompute {
	constructor(
		@InjectRepository(FileEntity) private readonly fileModel: Repository<FileEntity>,
		@InjectRepository(FileSourceEntity) private readonly sourceModel: Repository<FileSourceEntity>
	) {
		super()
	}

	/**上传文件**/
	public async FileCreate(files: Array<Express.Multer.File>) {
		try {
			if (files.length === 0) {
				throw new HttpException('File 不能为空', HttpStatus.BAD_REQUEST)
			} else {
				const response = []
				while (files.length) {
					const item = files.shift()
					const name = item.originalname.split('.').pop()?.toLowerCase()
					const source = await this.sourceModel.findOne({ where: { name } })
					if (!source) {
						const newSource = await this.sourceModel.create({ name, total: 1 })
						await this.sourceModel.save(newSource)
					} else {
						await this.sourceModel.update({ id: source.id }, { total: source.total + 1 })
					}

					const __source__ = source ?? (await this.sourceModel.findOne({ where: { name } }))
					const newFile = await this.fileModel.create({
						old_name: item.originalname,
						new_name: item.filename,
						size: item.size,
						path: `${item.destination.replace('./public', '')}/${item.filename}`,
						source: __source__
					})
					const saveFile = await this.fileModel.save(newFile)
					response.push(saveFile)
				}

				return response
			}
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**文件列表**/
	public async FileList(props: DTO.FileListQuery) {
		try {
			const [list = [], total = 0] = await this.fileModel
				.createQueryBuilder('t')
				.leftJoinAndSelect('t.source', 'source')
				.where(
					new Brackets(Q => {
						if (!isEmpty(props.name)) {
							Q.andWhere('source.name = :name', { name: props.name })
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

	/*文件类型列表**/
	public async FileSource(props: DTO.FileSourceQuery) {
		try {
			const [list = [], total = 0] = await this.sourceModel.findAndCount({
				skip: (props.page - 1) * props.size,
				take: props.size
			})
			return { list, total }
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**文件详情**/
	public async FileMatter(props: DTO.MatterQuery) {
		try {
			return await this.validator({
				message: '文件',
				empty: true,
				close: true,
				model: this.fileModel,
				options: { where: { id: props.id }, relations: ['source'] }
			})
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**文件类型详情**/
	public async SourceMatter(props: DTO.MatterQuery) {
		try {
			return await this.validator({
				message: '文件类型',
				empty: true,
				close: true,
				model: this.sourceModel,
				options: { where: { id: props.id } }
			})
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}

	/**文件鉴权**/
	public async FileAuth(props: DTO.FileAuthQuery) {
		try {
			const file = await this.validator({
				message: '文件',
				empty: true,
				close: true,
				model: this.fileModel,
				options: { where: { id: props.id } }
			})

			return file
		} catch (e) {
			throw new HttpException(e.message || e.toString(), HttpStatus.BAD_REQUEST)
		}
	}
}
