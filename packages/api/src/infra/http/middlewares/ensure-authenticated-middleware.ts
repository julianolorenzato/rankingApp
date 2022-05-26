import { NextFunction, Request, Response } from 'express'
import { JWT } from 'modules/accounts/services/jwt-service'

export async function ensureAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.headers.authorization

	const jwt = JWT.verifyUserToken(token)

	if(jwt.isRight()) {
		req.body.payload = jwt.value
		return next()
	} else {
		return res.status(403).json(jwt.value)
	}
}
