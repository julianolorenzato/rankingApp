import { User, UserProps } from '@/modules/accounts/entities/User'

import { IUsersRepository } from '../../repositories/IUsersRepository'

import { EmailAlreadyExistsError } from './errors/EmailAlreadyExistsError'
import { UsernameAlreadyExistsError } from './errors/UsernameAlreadyExistsError'

export class UserRegistration {
	private readonly usersRepository: IUsersRepository

	constructor(userRepo: IUsersRepository) {
		this.usersRepository = userRepo
	}

	async execute(userProps: UserProps): Promise<void> {
		const { username, email } = userProps

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
			throw new EmailAlreadyExistsError(username.value)
		}

		const user = User.create(userProps)
		
		await this.usersRepository.save(user)
	}
}
