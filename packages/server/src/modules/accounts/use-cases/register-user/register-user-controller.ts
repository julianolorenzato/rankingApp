import { RegisterUserUseCase } from './register-user-use-case'
// import { Request, Response } from 'express'
import { UserDTO } from 'modules/accounts/dtos/user-dto'
import { Controller } from 'shared/contracts/infra/controller'

type Request = {
	username: string,
	email: string,
	password: string
}

type Response = UserDTO

export class RegisterUserController extends Controller<Request, Response> {
	constructor(private registerUserUseCase: RegisterUserUseCase) {
		super()
	}

	protected async handle(req: Request) {
		const { username, email, password } = req

		// try {
			const output = await this.registerUserUseCase.execute({
				username,
				email,
				password
			})

			if (output.isLeft()) {
				const error = output.value

				return this.clientError(error)
				// return res.status(400).json({ error })
			}

			const response: UserDTO = {
				id: output.value.id,
				email: output.value.email.value,
				username: output.value.username.value
			}

			return this.created(response)
			// return res.status(201).json(response)
		// } catch (e) {
		// 	if (e instanceof Error) return res.status(500).json({ error: e.message })
		// }
	}
}
