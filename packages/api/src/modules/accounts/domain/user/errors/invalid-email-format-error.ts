export class InvalidEmailFormatError extends Error {
	constructor(email: string) {
		super(`The email ${email} have an invalid format`)
		this.name = 'InvalidEmailFormatError'
	}
}
