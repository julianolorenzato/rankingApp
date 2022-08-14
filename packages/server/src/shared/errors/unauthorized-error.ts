export class UnauthorizedError extends Error {
	constructor() {
		super('You do not have permissions to access this resource')
		this.name = 'UnauthorizedError'
	}
}
