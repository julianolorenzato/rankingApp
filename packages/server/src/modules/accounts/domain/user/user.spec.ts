import { randomUUID } from 'crypto'
import { Email } from './email'
import { UserRegistered } from '../user/events/user-registered'
import { Password } from './password'
import { User } from './user'
import { Username } from './username'

describe('Aggregate root - user', () => {
	const username = Username.create({ value: 'jakeotaku' }).value as Username
	const email = Email.create({ value: 'iloveanimes@love.com' }).value as Email
	const password = Password.create({ value: 'sasukeuchiha123' }).value as Password

	it('should be able to create a new user', () => {
		const user = User.create({
			username,
			email,
			password
		})

		expect(user).toHaveProperty('id')
		expect(user).toHaveProperty('createdAt')
	})

	it('should be able to create an UserRegistered event when a new user is created', () => {
		const user = User.create({
			username,
			email,
			password
		})

        const userEvent = user.domainEvents[0]
        expect(userEvent).toBeInstanceOf(UserRegistered)
		expect(userEvent.getAggregateId()).toBe(user.id)
	})

    it('should be able to create an existing user passing the id', () => {
        const fakeId = randomUUID()

        const existingUser = User.create({
			username,
			email,
			password,
		}, fakeId)

        expect(existingUser).toHaveProperty('id')
        expect(existingUser).toHaveProperty('createdAt')
    })

    it('should not be able to create an UserRegistered event when an existing user is created', () => {
        const fakeId = randomUUID()

        const existingUser = User.create({
			username,
			email,
			password,
		}, fakeId)

        const userEvent = existingUser.domainEvents[0]
        expect(userEvent).toBeUndefined()
    })
})
