import { Request, Response } from 'express'
import { Controller } from '../../controller'

interface RequestImproved extends Request {
	payload: any
}

export const adaptRoute = (controller: Controller<any, any>) => {
	return async (req: RequestImproved, res: Response) => {
		const requestData = {
			...req.body,
			...req.params,
			...req.query,
			payload: req.payload
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
