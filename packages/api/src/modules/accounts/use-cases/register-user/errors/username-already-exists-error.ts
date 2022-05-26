export class UsernameAlreadyExistsError extends Error {
	constructor(username: string) {
		super(`The username ${username} already exists`)
		this.name = 'UsernameAlreadyExistsError'
	}
}
