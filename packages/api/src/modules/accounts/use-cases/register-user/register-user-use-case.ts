import { Either, left, right } from 'shared/logic/either'
import { UseCase } from 'shared/core/use-case'

import { User, Username, Email, Password } from 'modules/accounts/domain/user'

import { IUsersRepository } from '../../repositories/user-repository'

import { UsernameAlreadyExistsError } from './errors/username-already-exists-error'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'

import { InvalidEmailFormatError } from 'modules/accounts/domain/user/errors/invalid-email-format-error'
import { InvalidLengthError } from 'modules/accounts/domain/user/errors/invalid-length-error'

type Errors =
	| UsernameAlreadyExistsError
	| EmailAlreadyExistsError
	| InvalidEmailFormatError
	| InvalidLengthError

type UseCaseRequest = {
	username: string
	email: string
	password: string
}

type UseCaseResponse = Either<Errors, User>

export class RegisterUserUseCase
	implements UseCase<UseCaseRequest, UseCaseResponse>
{
	private readonly usersRepository

	constructor(usersRepo: IUsersRepository) {
		this.usersRepository = usersRepo
	}

	async execute(data: UseCaseRequest): Promise<UseCaseResponse> {
		const { username, email, password } = data

		const usernameOrError = Username.create({ value: username })
		const emailOrError = Email.create({ value: email })
		const passwordOrError = Password.create({ value: password })

		if (usernameOrError.isLeft()) return left(usernameOrError.value)
		if (emailOrError.isLeft()) return left(emailOrError.value)
		if (passwordOrError.isLeft()) return left(passwordOrError.value)

		const user = User.create({
			username: usernameOrError.value,
			email: emailOrError.value,
			password: passwordOrError.value
		})

		const usernameAlreadyExists = await this.usersRepository.findByUsername(
			user.username.value
		)

		if (usernameAlreadyExists) {
			return left(new UsernameAlreadyExistsError(user.username.value))
		}

		const emailAlreadyExists = await this.usersRepository.findByEmail(
			user.email.value
		)

		if (emailAlreadyExists) {
			return left(new EmailAlreadyExistsError(user.email.value))
		}

		await this.usersRepository.save(user)

		return right(user)
	}
}
