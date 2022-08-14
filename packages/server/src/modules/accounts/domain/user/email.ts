import { Either, left, right } from 'shared/logic/either'
import { ValueObject } from 'base/domain/value-object'

import { InvalidEmailFormatError } from './errors/invalid-email-format-error'
import { InvalidLengthError } from '../../../../shared/errors/invalid-length-error'

export interface IEmailProps {
	value: string
}

export class Email extends ValueObject<IEmailProps> {
	public static MAX_LENGTH = 255 as const

	private constructor(props: IEmailProps) {
		super(props)
	}

	get value(): string {
		return this.props.value
	}

	private static validateFormat(email: string) {
		var re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return re.test(email)
	}

	private static validate(email: string) {
		if (email.length > this.MAX_LENGTH) {
			return false
		}

		return true
	}

	static create({ value }: IEmailProps): Either<Error, Email> {
		const isFormatValid = this.validateFormat(value)
		const isValid = this.validate(value)

		if (!isFormatValid) return left(new InvalidEmailFormatError(value))
		if (!isValid) return left(new InvalidLengthError('email', value))

		return right(new Email({ value }))
	}
}
