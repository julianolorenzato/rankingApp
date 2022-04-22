import { ApplicationError } from './ApplicationError'

export class UsernameAlreadyExistsError
	extends Error
	implements ApplicationError
{
	constructor(username: string) {
		super(`The username ${username} already exists`)
		this.name = 'UsernameAlreadyExistsError'
	}
}
