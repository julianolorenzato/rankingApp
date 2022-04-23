import { User, Username, Email, Password } from '@accounts/entities/User'
import { IUserRegistrationDTO } from './UserRegistrationDTO'

import { IUsersRepository } from '../../repositories/IUsersRepository'

import { UsernameAlreadyExistsError } from './errors/UsernameAlreadyExistsError'
import { EmailAlreadyExistsError } from './errors/EmailAlreadyExistsError'

type UserRegistrationRequest = {
	username: string
	email: string
	password: string
}

export class userRegistrationUseCase {
	private readonly usersRepository: IUsersRepository

	constructor(userRepo: IUsersRepository) {
		this.usersRepository = userRepo
	}
	//DTO OU UserRegistrationRequest??
	async execute(props: IUserRegistrationDTO): Promise<void> {
		const username = Username.create(props.username)
		const email = Email.create(props.email)
		const password = Password.create(props.password)

		const usernameAlreadyExists = await this.usersRepository.findByUsername(
			username.value
		)

		if (usernameAlreadyExists) {
			throw new UsernameAlreadyExistsError(username.value)
		}

		const emailAlreadyExists = await this.usersRepository.findByEmail(
			email.value
		)

		if (emailAlreadyExists) {
			throw new EmailAlreadyExistsError(email.value)
		}

		const user = User.create({
			username,
			email,
			password,
			createdAt: new Date()
		})

		await this.usersRepository.save(user)
	}
}
