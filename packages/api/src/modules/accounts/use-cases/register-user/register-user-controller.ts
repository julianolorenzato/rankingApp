import { RegisterUserUseCase } from './register-user-use-case'
import { Request, Response } from 'express'

export class RegisterUserController {
	constructor(private registerUserUseCase: RegisterUserUseCase) {}

	async handle(req: Request, res: Response) {
		const { username, email, password } = req.body

		try {
			const result = await this.registerUserUseCase.execute({
				username,
				email,
				password
			})

			if (result.isLeft()) {
				const error = result.value.message
				return res.status(400).json({ error })
			}

			return res.status(201).send(result.value)
		} catch (e) {
			if (e instanceof Error) res.status(500).json({ error: e.message })
		}
	}
}
