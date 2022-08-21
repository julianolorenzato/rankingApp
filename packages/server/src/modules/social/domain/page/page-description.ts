import { ValueObject } from 'shared/contracts/domain/value-object'
import { InvalidLengthError } from 'shared/errors/invalid-length-error'
import { Either, left, right } from 'shared/logic/either'

interface IPageDescriptionProps {
	value: string
}

export class PageDescription extends ValueObject<IPageDescriptionProps> {
	static MIN_LENGTH = 10
	static MAX_LENGTH = 400

	private constructor(props: IPageDescriptionProps) {
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

	static create(value: string): Either<InvalidLengthError, PageDescription> {
        const isValid = this.validate(value)

        if(isValid) {
            return right(new PageDescription({ value }))
        }

        return left(new InvalidLengthError('page description', value))
    }
}
