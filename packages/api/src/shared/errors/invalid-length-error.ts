type FieldTypes = 'username' | 'email' | 'password' | 'page title' | 'page description'

export class InvalidLengthError extends Error {
	constructor(field: FieldTypes, value?: string) {
		if (!value || field === 'password') {
			super(`The ${field} have an invalid length`)
		} else {
			super(`The ${field} ${value} have an invalid length`)
		}
		this.name = 'InvalidLengthError'
	}
}
