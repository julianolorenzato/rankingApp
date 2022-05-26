import { AuthUserUseCase } from './auth-user-use-case'
import { Request, Response } from 'express'

export class AuthUserController {
	constructor(private authUserUseCase: AuthUserUseCase) {}

	async handle(req: Request, res: Response) {
		const { email, password } = req.body

		try {
			const result = await this.authUserUseCase.execute({
				email,
				password
			})

			if (result.isLeft()) {
				const error = result.value.message
				return res.status(400).json({ error })
			}

			return res.status(200).send(result.value)
		} catch (e) {
			if (e instanceof Error) res.status(500).json({ error: e.message })
		}
	}
}
