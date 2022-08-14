import { Request, Response } from 'express'
import { Controller } from '../../../contracts/infra/controller'

export const adaptRoute = (controller: Controller<any, any>) => {
	return async (req: Request, res: Response) => {
		const requestData = {
			...req.body,
			...req.params,
			...req.query
		}

		const httpResponse = await controller.handleTry(requestData)

		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			return res.status(httpResponse.statusCode).json(httpResponse.body)
		} else {
			return res.status(httpResponse.statusCode).json({
				error: httpResponse.body.error
			})
		}
	}
}
