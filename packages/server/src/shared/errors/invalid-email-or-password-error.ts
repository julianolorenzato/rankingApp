export class InvalidEmailOrPasswordError extends Error {
	constructor() {
		super(`Email or password is invalid`)
		this.name = 'InvalidEmailOrPasswordError'
	}
}
