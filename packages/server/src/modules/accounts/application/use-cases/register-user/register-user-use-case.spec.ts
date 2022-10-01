import { InMemoryUserRepository } from '../../../infra/repositories/in-memory/user-repository'
import { RegisterUserUseCase } from './register-user-use-case'
import { IUserRepository } from 'modules/accounts/domain/user/repository'
import { User } from 'modules/accounts/domain/user'
import { AlreadyExistsError } from 'shared/errors/already-exists-error'

describe('UseCase - RegisterUser', () => {
	let userRepository: IUserRepository
	let registerUserUseCase: RegisterUserUseCase

	beforeEach(() => {
		userRepository = new InMemoryUserRepository()
		registerUserUseCase = new RegisterUserUseCase(userRepository)
	})

	it('should be able to register a new user', async () => {
		const user = await registerUserUseCase.execute({
			username: 'thecoolguy',
			email: 'bigpineapple@bubble.com',
			password: 'themostsecretpassintheworld'
		})

		expect(user.value).toBeInstanceOf(User)
		expect(user.value).toHaveProperty('id')
	})

	// it('should be able to dispatch an UserRegistered event after register a new user', async () => {

	// })

	it('shoud not be able to register a user with an username that already exists', async () => {
		const sameUsername = 'darkcat'

		await registerUserUseCase.execute({
			username: sameUsername,
			email: 'dogrival@catsmail.com',
			password: 'meow123456'
		})

		const user = await registerUserUseCase.execute({
			username: sameUsername,
			email: 'bigpineapple@bubble.com',
			password: 'themostsecretpassintheworld'
		})

		expect(user.value).toStrictEqual(new AlreadyExistsError('username', sameUsername))
	})

	it('should not be able to register a user with an email that already exists', async () => {
		const sameEmail = 'dogrival@catsmail.com'

        await registerUserUseCase.execute({
			username: 'darkcat',
			email: sameEmail,
			password: 'meow123456'
		})

        const user = await registerUserUseCase.execute({
			username: 'thecoolguy',
			email: sameEmail,
			password: 'themostsecretpassintheworld'
		})

        expect(user.value).toStrictEqual(new AlreadyExistsError('email', sameEmail))
    })
})
