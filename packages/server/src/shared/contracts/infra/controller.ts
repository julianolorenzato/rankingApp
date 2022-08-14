import { HttpResponse } from './http-response'

export abstract class Controller<RequestData, ResponseDTO = {}> {
	protected abstract handle(requestData: RequestData): Promise<HttpResponse>

	public async handleTry(requestData: RequestData): Promise<HttpResponse> {
		try {
			return await this.handle(requestData)
		} catch (e) {
			return this.fail(e)
		}
	}

	protected ok(dto?: ResponseDTO): HttpResponse {
		return {
			statusCode: 200,
			body: dto
		}
	}

	protected created(dto?: ResponseDTO): HttpResponse {
		return {
			statusCode: 201,
			body: dto
		}
	}

	protected clientError(error: Error): HttpResponse {
		return {
			statusCode: 400,
			body: {
				error: error.message
			}
		}
	}

	protected unauthorized(error: Error): HttpResponse {
		return {
			statusCode: 401,
			body: {
				error: error.message
			}
		}
	}

	protected forbidden(error: Error): HttpResponse {
		return {
			statusCode: 403,
			body: {
				error: error.message
			}
		}
	}

	protected notFound(error: Error): HttpResponse {
		return {
			statusCode: 404,
			body: {
				error: error.message
			}
		}
	}

	protected conflict(error: Error): HttpResponse {
		return {
			statusCode: 409,
			body: {
				error: error.message
			}
		}
	}

	private fail(error: Error): HttpResponse {
		console.log(`[Controller] Unexpected Error: ${error.message}`)

		return {
			statusCode: 500,
			body: {
				error: error.message
			}
		}
	}
}
