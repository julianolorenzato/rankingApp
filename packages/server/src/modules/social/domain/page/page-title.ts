import { ValueObject } from 'shared/domain/value-object'
import { InvalidLengthError } from 'shared/errors/invalid-length-error'
import { Either, left, right } from 'shared/logic/either'

interface IPageTitleProps {
	value: string
}

export class PageTitle extends ValueObject<IPageTitleProps> {
	static MIN_LENGTH = 1
	static MAX_LENGTH = 40

	private constructor(props: IPageTitleProps) {
		super(props)
	}

	private static validate(value: string): boolean {
		const len = value.length

		if (len > this.MAX_LENGTH || len < this.MIN_LENGTH) {
			return false
		}

		return true
	}

	static create(value: string): Either<InvalidLengthError, PageTitle> {
        const isValid = this.validate(value)

        if(isValid) {
            return right(new PageTitle({ value }))
        }

        return left(new InvalidLengthError('page title', value))
    }
}
