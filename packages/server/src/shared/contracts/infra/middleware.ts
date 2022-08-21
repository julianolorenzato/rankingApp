import { HttpResponse } from './http-response'

export abstract class Middleware<RequestData> {
	protected abstract handle(requestData: RequestData): Promise<HttpResponse>

	public async handleTry(requestData: RequestData): Promise<HttpResponse> {
		try {
			return await this.handle(requestData)
		} catch (e) {
            return this.fail(e)
		}
	}

    protected ok(payload: any): HttpResponse {
        return {
            statusCode: 200,
            body: {
                payload
            }
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

    private fail(error: Error): HttpResponse {
		console.log(`[Middleware] Unexpected Error: ${error.message}`)

		return {
			statusCode: 500,
			body: {
				error: error.message
			}
		}
	}
}
