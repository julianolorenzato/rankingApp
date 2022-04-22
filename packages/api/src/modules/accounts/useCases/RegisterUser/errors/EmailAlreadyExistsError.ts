import { ApplicationError } from './ApplicationError'

export class EmailAlreadyExistsError extends Error implements ApplicationError {
	constructor(email: string) {
		super(`The email ${email} already exists`)
		this.name = 'EmailAlreadyExistsError'
	}
}
