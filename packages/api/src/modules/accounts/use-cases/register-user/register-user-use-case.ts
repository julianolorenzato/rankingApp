import { Either, left, right } from 'shared/logic/either'
import { UseCase } from 'shared/application/use-case'

import { User, Username, Email, Password } from 'modules/accounts/domain/user'

import { IUserRepository } from '../../repositories/user-repository'

import { InvalidEmailFormatError } from 'modules/accounts/domain/user/errors/invalid-email-format-error'
import { InvalidLengthError } from 'shared/errors/invalid-length-error'
import { EventsDispatcher } from 'shared/domain/events/events-dispatcher'
import { AlreadyExistsError } from 'shared/errors/already-exists-error'

type Errors = InvalidLengthError | InvalidEmailFormatError | AlreadyExistsError

type UseCaseRequest = {
	username: string
	email: string
	password: string
}

type UseCaseResponse = Either<Errors, User>

export class RegisterUserUseCase implements UseCase<UseCaseRequest, UseCaseResponse> {
	private readonly userRepository: IUserRepository

	constructor(usersRepo: IUserRepository) {
		this.userRepository = usersRepo
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

		const usernameAlreadyExists = await this.userRepository.findByUsername(user.username.value)

		if (usernameAlreadyExists) {
			return left(new AlreadyExistsError('username', user.username.value))
		}

		const emailAlreadyExists = await this.userRepository.findByEmail(user.email.value)

		if (emailAlreadyExists) {
			return left(new AlreadyExistsError('email', user.email.value))
		}

		await this.userRepository.save(user)

		EventsDispatcher.dispatchEventsForAggregate(user.id)

		return right(user)
	}
}
