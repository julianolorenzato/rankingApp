import { inMemoryUserRepositoryInstace } from 'modules/accounts/repositories/in-memory/in-memory-user-repository'
import { RegisterUserUseCase } from './register-user-use-case'
import { IUserRepository } from '../../repositories/user-repository'
import { User } from 'modules/accounts/domain/user'
import { AlreadyExistsError } from 'shared/errors/already-exists-error'
import { inMemoryMembersRepositoryInstance } from 'modules/social/repositories/implementations/in-memory-member-repository'

describe('UseCase:', () => {
	let userRepository: IUserRepository
	let registerUserUseCase: RegisterUserUseCase

	beforeAll(() => {
		userRepository = new 
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

	it('shoud not be able to register a user with an username that already exists', async () => {
		await registerUserUseCase.execute({
			username: 'darkcat',
			email: 'dogrival@catsmail.com',
			password: 'meow123456'
		})

		const user = await registerUserUseCase.execute({
			username: 'thecoolguy',
			email: 'bigpineapple@bubble.com',
			password: 'themostsecretpassintheworld'
		})
        console.log(user.value)
		expect(user.value).toStrictEqual(new AlreadyExistsError('username', 'thecoolguy'))
	})

	it('should not be able to register a user with an email that aready exists', async () => {
        await registerUserUseCase.execute({
			username: 'darkcat',
			email: 'dogrival@catsmail.com',
			password: 'meow123456'
		})

        const user = await registerUserUseCase.execute({
			username: 'thecoolguy',
			email: 'bigpineapple@bubble.com',
			password: 'themostsecretpassintheworld'
		})

        expect(user.value).toStrictEqual(new AlreadyExistsError('username', 'thecoolguy'))
    })
})
