import { RegisterUserUseCase } from './register-user-use-case'
import { toUserDTO, UserDTO } from 'modules/accounts/application/dtos/user-dto'
import { Controller } from 'shared/contracts/infra/controller'
import { HttpResponse } from 'shared/contracts/infra/http-response'

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

	protected async handle(requestData: RequestData): Promise<HttpResponse> {
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

		const response: UserDTO = toUserDTO(output.value)

		// const response: UserDTO = {
		// 	id: output.value.id,
		// 	email: output.value.email.value,
		// 	username: output.value.username.value
		// }

		return this.created(response)
	}
}
