type FieldTypes = 'username' | 'email' | 'page title' | 'member' | 'option name' | 'poll'

export class AlreadyExistsError extends Error {
	constructor(field: FieldTypes, value: string) {
		super(`The ${field} ${value} already exists`)
		this.name = 'AlreadyExistsError'
	}
}
