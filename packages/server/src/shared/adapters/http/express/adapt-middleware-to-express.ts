import { NextFunction, Request, Response } from 'express'
import { Middleware } from 'shared/contracts/infra/middleware'

export const adaptMiddleware = (middleware: Middleware<any>) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const requestData = {
			accessToken: req.headers?.['x-access-token'],
			...(req.headers || {})
		}

		const httpResponse = await middleware.handleTry(requestData)

		if (httpResponse.statusCode === 200) {
			Object.assign(req, httpResponse.body)

			next()
		} else {
			return res.status(httpResponse.statusCode).json({
				error: httpResponse.body.error
			})
		}
	}
}
