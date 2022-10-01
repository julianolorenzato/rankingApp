import { JWT } from 'modules/accounts/application/services/jwt-service'
import { HttpResponse } from 'shared/contracts/infra/http-response'
import { Middleware } from 'shared/contracts/infra/middleware'
import { AccessTokenMustBeProvidedError } from 'shared/errors/access-token-must-be-provided-error'

type RequestData = {
	accessToken: string
}

class EnsureAuthenticatedMiddleware extends Middleware<RequestData> {
	protected async handle(requestData: RequestData): Promise<HttpResponse> {
		const { accessToken } = requestData

		if (!accessToken) {
			return this.clientError(new AccessTokenMustBeProvidedError())
		}

		const result = JWT.verifyUserToken(accessToken)

		if (result.isRight()) {
			const { payload } = result.value

			return this.ok(payload)
		} else {
			return this.unauthorized(result.value)
		}
	}
}

const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware()

export { ensureAuthenticatedMiddleware }
