import { DomainError } from '@/modules/accounts/entities/User/errors/DomainError'

export class InvalidUsernameError extends Error implements DomainError {
	constructor(username: string) {
		super(`The username ${username} is invalid`)
		this.name = 'InvalidUsernameError'
	}
}
