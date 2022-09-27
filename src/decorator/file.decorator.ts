import { ApiBody, ApiConsumes } from '@nestjs/swagger'
import type { SchemaObject, ReferenceObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'

/**自定义文件上传装饰器**/
export const ApiMultipleFile = (props: Record<string, SchemaObject | ReferenceObject> = {}): MethodDecorator => {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		ApiConsumes('multipart/form-data')(target, propertyKey, descriptor)
		ApiBody({
			required: true,
			schema: {
				type: 'object',
				properties: Object.assign(props, {
					file: {
						type: 'array',
						items: {
							type: 'string',
							format: 'binary'
						}
					}
				})
			}
		})(target, propertyKey, descriptor)
	}
}
