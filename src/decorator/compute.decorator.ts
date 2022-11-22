import type { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger'
import { ApiOperation, ApiConsumes, ApiProduces, ApiResponse } from '@nestjs/swagger'
import { applyDecorators } from '@nestjs/common'

interface Option {
	operation: ApiOperationOptions
	response: ApiResponseOptions
}

/**
 *
 * @param option
 * @returns
 */
export function ApiCompute(option?: Option) {
	const decorator: Array<ClassDecorator | MethodDecorator | PropertyDecorator> = [
		ApiOperation(option.operation),
		ApiConsumes('application/x-www-form-urlencoded', 'application/json'),
		ApiProduces('application/json', 'application/xml'),
		ApiResponse(option.response)
	]

	return applyDecorators(...decorator)
}

export function toArrayString({ value }) {
	if (value && Array.isArray(value)) {
		return value
	} else if (value && typeof value !== 'string') {
		return value.split(',').map(k => String(k)) || []
	} else {
		return []
	}
}
