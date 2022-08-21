import { User } from 'modules/accounts/domain/user'
import { JWT } from 'modules/accounts/services/jwt-service'
import { Either, left, right } from 'shared/logic/either'
import { IUserRepository } from '../../repositories/user-repository'
import { InvalidEmailOrPasswordError } from '../../../../shared/errors/invalid-email-or-password-error'

export type TokenResponse = {
	token: string
}

type Output = Either<InvalidEmailOrPasswordError, TokenResponse>
type Input = {
	email: string
	password: string
}

export class AuthUserUseCase {
	private readonly userRepository: IUserRepository

	constructor(usersRepo: IUserRepository) {
		this.userRepository = usersRepo
	}

	async execute(data: Input): Promise<Output> {
		const { email, password } = data

		const user = await this.userRepository.findByEmail(email)

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
