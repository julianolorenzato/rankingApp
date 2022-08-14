import { InvalidJWTTokenError } from "modules/accounts/services/errors/invalid-jwt-token-error";
import { JWT } from "modules/accounts/services/jwt-service";
import { HttpResponse } from "shared/contracts/infra/http-response";
import { Middleware } from "shared/contracts/infra/middleware";
import { InvalidAccessTokenError } from "shared/errors/invalid-access-token-error";
import { NotFoundError } from "shared/errors/not-found-error";
import { UnauthorizedError } from "shared/errors/unauthorized-error";

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
            return this.ok(accessToken)
        } else {
            return this.unauthorized(new UnauthorizedError())
        }

    }
}

const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware()

export { ensureAuthenticatedMiddleware }