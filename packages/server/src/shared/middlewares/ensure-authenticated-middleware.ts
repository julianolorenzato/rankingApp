import { JWT } from 'modules/accounts/services/jwt-service'
import { HttpResponse } from 'shared/contracts/infra/http-response'
import { Middleware } from 'shared/contracts/infra/middleware'
import { InvalidAccessTokenError } from 'shared/errors/invalid-access-token-error'
import { UnauthorizedError } from 'shared/errors/unauthorized-error'

type RequestData = {
	accessToken: string
}

class EnsureAuthenticatedMiddleware extends Middleware<any> {
	protected async handle(requestData: RequestData): Promise<HttpResponse> {
		const { accessToken } = requestData

		if (!accessToken) {
			return this.unauthorized(new InvalidAccessTokenError())
		}

		const jwt = JWT.verifyUserToken(accessToken)

		if (jwt.isRight()) {
			const { payload } = jwt.value

			return this.ok(payload)
		} else {
			return this.unauthorized(new UnauthorizedError())
		}
	}
}

const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware()

export { ensureAuthenticatedMiddleware }
