export class AlreadyFollowingError extends Error {
	constructor(value: string) {
		super(`The member ${value} is already following`)
		this.name = 'AlreadyFollowingError'
	}
}
