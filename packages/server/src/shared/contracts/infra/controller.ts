export type HttpResponse<T = any> = {
	statusCode: number
	body: {
		[K in 'data' | 'error']?: T
	}
}

export abstract class Controller<T, U> {
	protected abstract handle (request: T): Promise<HttpResponse>

	public async handleTry(request: T) {
		try {
			await this.handle(request)
		} catch(e) {
			return this.fail(e)
		}
	}

	protected ok<T>(dto?: U): HttpResponse {
		return {
			statusCode: 200,
			body: {
				data: dto
			}
		}
	}

	protected created(dto?: U): HttpResponse {
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
