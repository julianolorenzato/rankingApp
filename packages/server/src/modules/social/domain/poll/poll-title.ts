import { ValueObject } from 'shared/contracts/domain/value-object'
import { InvalidLengthError } from 'shared/errors/invalid-length-error'
import { Either, left, right } from 'shared/logic/either'

interface IPollTitleProps {
	value: string
}

export class PollTitle extends ValueObject<IPollTitleProps> {
	static MIN_LENGTH = 5
	static MAX_LENGTH = 80

	private constructor(props: IPollTitleProps) {
		super(props)
	}

	private static validate(value: string): boolean {
		const len = value.length

		if (len > this.MAX_LENGTH || len < this.MIN_LENGTH) {
			return false
		}

		return true
	}

	get value(): string {
		return this.props.value
	}

	static create({ value }: IPollTitleProps): Either<InvalidLengthError, PollTitle> {
        const isValid = this.validate(value)

        if(isValid) {
            return right(new PollTitle({ value }))
        }

        return left(new InvalidLengthError('poll title', value))
    }
}
