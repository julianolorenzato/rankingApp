type FieldTypes = 'Member'

export class NotFoundError extends Error {
	constructor(field: FieldTypes, value: string) {
		super(`${field} ${value} not found`)
		this.name = 'NotFoundError'
	}
}