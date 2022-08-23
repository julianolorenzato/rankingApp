import { Entity } from 'shared/contracts/domain/entity'
import { InvalidLengthError } from 'shared/errors/invalid-length-error'
import { Either, left, right } from 'shared/logic/either'
import { OptionVote } from './option-vote'

interface IOptionProps {
	name: string
	votes: OptionVote[]
}

export class Option extends Entity<IOptionProps> {
	static MIN_LENGTH = 1
	static MAX_LENGTH = 50

	private constructor(props: IOptionProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt)
	}

	private static validate(value: string): boolean {
		const len = value.length

		if (len > this.MAX_LENGTH || len < this.MIN_LENGTH) {
			return false
		}

		return true
	}

    get name (): string {
        return this.props.name
    }

	get votes(): OptionVote[] {
		return this.props.votes
	}

	addVote(vote: OptionVote): void {
		this.props.votes.push(vote)
	}

	static create({ name, votes }: IOptionProps, id?: string, createdAt?: Date): Either<InvalidLengthError, Option> {
		const isValid = this.validate(name)
		const isNew = !id

		if (isValid) {
			const option = new Option({ name, votes }, id, createdAt)

			isNew && (option.props.votes = [])

			return right(option)
		}

		return left(new InvalidLengthError('poll option name', name))
	}
}
