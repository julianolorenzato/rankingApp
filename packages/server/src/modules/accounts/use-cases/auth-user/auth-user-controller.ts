import { AuthUserUseCase } from './auth-user-use-case'
import { Controller } from 'shared/contracts/infra/controller'

type RequestData = {
	email: string
	password: string
}

type Response = {
	token: string
}

export class AuthUserController extends Controller<RequestData, Response> {
	constructor(private authUserUseCase: AuthUserUseCase) {
		super()
	}

	protected async handle(requestData: RequestData) {
		const { email, password } = requestData

		const output = await this.authUserUseCase.execute({
			email,
			password
		})

		if (output.isLeft()) {
			const error = output.value
			return this.clientError(error)
		}

		return this.ok(output.value)
	}
}
