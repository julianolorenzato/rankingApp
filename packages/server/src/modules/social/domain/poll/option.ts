import { Entity } from 'shared/contracts/domain/entity'
import { InvalidLengthError } from 'shared/errors/invalid-length-error'
import { MemberAlreadyVotedError } from 'shared/errors/member-already-voted-error'
import { Either, left, right } from 'shared/logic/either'
import { Vote } from './vote'

export interface IOptionProps {
	name: string
	votes: Vote[]
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

	get name(): string {
		return this.props.name
	}

	get votes(): Vote[] {
		return this.props.votes
	}

	addVote(vote: Vote): Either<MemberAlreadyVotedError, void> {
		const memberAlreadyVoted = this.votes.some(vt => vt.memberId === vote.memberId)
		if (memberAlreadyVoted) {
			return left(new MemberAlreadyVotedError(vote.memberId))
		}

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
