import { RegisterUserUseCase } from './register-user-use-case'
// import { Request, Response } from 'express'
import { UserDTO } from 'modules/accounts/dtos/user-dto'
import { Controller } from 'shared/contracts/infra/controller'

type RequestData = {
	username: string
	email: string
	password: string
}

type ResponseDTO = UserDTO

export class RegisterUserController extends Controller<RequestData, ResponseDTO> {
	constructor(private registerUserUseCase: RegisterUserUseCase) {
		super()
	}

	protected async handle(requestData: RequestData) {
		const { username, email, password } = requestData

		const output = await this.registerUserUseCase.execute({
			username,
			email,
			password
		})

		if (output.isLeft()) {
			const error = output.value
			return this.clientError(error)
		}

		const response: UserDTO = {
			id: output.value.id,
			email: output.value.email.value,
			username: output.value.username.value
		}

		return this.created(response)
	}
}
