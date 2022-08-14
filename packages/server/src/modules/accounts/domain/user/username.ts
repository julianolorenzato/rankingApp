import { Either, left, right } from 'shared/logic/either'
import { ValueObject } from 'shared/contracts/domain/value-object'

import { InvalidLengthError } from '../../../../shared/errors/invalid-length-error'

interface IUsernameProps {
	value: string
}

export class Username extends ValueObject<IUsernameProps> {
	public static MIN_LENGTH = 3 as const
	public static MAX_LENGTH = 20 as const

	private constructor(props: IUsernameProps) {
		super(props)
	}

	get value(): string {
		return this.props.value
	}

	private static validate(username: string): boolean {
		const len = username.length

		if (len > this.MAX_LENGTH || len < this.MIN_LENGTH) {
			return false
		}

		return true
	}

	static create({ value }: IUsernameProps): Either<Error, Username> {
		if (!this.validate(value)) {
			return left(new InvalidLengthError('username', value))
		}

		return right(new Username({ value }))
	}
}
