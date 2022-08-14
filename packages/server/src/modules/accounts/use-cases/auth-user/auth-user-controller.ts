import { AuthUserUseCase } from './auth-user-use-case'
import { Controller } from 'shared/contracts/infra/controller'

type RequestData = {
	email: string
	password: string
}

export class AuthUserController extends Controller<RequestData> {
	constructor(private authUserUseCase: AuthUserUseCase) {
		super()
	}

	async handle(requestData: RequestData) {
		const { email, password } = requestData

		const result = await this.authUserUseCase.execute({
			email,
			password
		})

		if (result.isLeft()) {
			const error = result.value
			return this.clientError(error)
		}

		return this.ok()
	}
}
