import { DomainError } from '@shared/errors/interfaces/DomainError'

export class InvalidPollTitleLengthError extends Error implements DomainError {
	constructor(title: string) {
		super(`The poll title ${title} have an invalid length`)
		this.name = 'InvalidPollTitleLengthError'
	}
}
