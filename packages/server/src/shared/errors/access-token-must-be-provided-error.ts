export class AccessTokenMustBeProvidedError extends Error {
	constructor() {
		super('You must provide an access token')
		this.name = 'AccessTokenMustBeProvidedError'
	}
}
