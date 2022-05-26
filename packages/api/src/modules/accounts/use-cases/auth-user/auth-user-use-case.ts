import { User } from 'modules/accounts/domain/user'
import { JWT } from 'modules/accounts/services/jwt-service'
import { Either, left, right } from 'shared/logic/either'
import { IUsersRepository } from '../../repositories/user-repository'
import { InvalidEmailOrPasswordError } from './errors/invalid-email-or-password-error'

type TokenResponse = {
	token: string
}

type UseCaseResponse = Either<InvalidEmailOrPasswordError, TokenResponse>
type UseCaseRequest = {
	email: string
	password: string
}

export class AuthUserUseCase {
	private readonly usersRepository

	constructor(usersRepo: IUsersRepository) {
		this.usersRepository = usersRepo
	}

	async execute(data: UseCaseRequest): Promise<UseCaseResponse> {
		const { email, password } = data

		const user = await this.usersRepository.findByEmail(email)

		if (!user) {
			return left(new InvalidEmailOrPasswordError())
		}

		const isPasswordValid = await user.password.comparePassword(password)

		if (!isPasswordValid) {
			return left(new InvalidEmailOrPasswordError())
		}

		const { token } = JWT.signUser(user)

		return right({ token })
	}
}
