import { AggregateRoot } from 'shared/contracts/domain/aggregate-root'
import { AlreadyExistsError } from 'shared/errors/already-exists-error'
import { NotFoundError } from 'shared/errors/not-found-error'
import { PollAlreadyFinishedError } from 'shared/errors/poll-already-finished-error'
import { Either, left } from 'shared/logic/either'
import { MemberId, PageId } from 'shared/contracts/domain/ids'
import { Option } from './option'
import { Vote } from './vote'
import { PollTitle } from './poll-title'
import { Member } from '../member/member'
import { UnauthorizedError } from 'shared/errors/unauthorized-error'

type AddOptionErrors = PollAlreadyFinishedError | AlreadyExistsError
type RemoveOptionErrors = PollAlreadyFinishedError | AlreadyExistsError | UnauthorizedError
type VoteErrors = PollAlreadyFinishedError | NotFoundError

type Results = {
	name: string
	percentage: number
}[]

type Permanent = {
	type: 'permanent'
}

type Temporary = {
	type: 'temporary'
	endDate: Date
}

export type Duration = Permanent | Temporary

export interface IPollProps {
	title: PollTitle
	options: Option[]
	ownerId: MemberId
	pageId: PageId
	duration: Duration
}

export class Poll extends AggregateRoot<IPollProps> {
	private constructor(props: IPollProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt)
	}

	get title(): PollTitle {
		return this.props.title
	}

	get ownerId(): string {
		return this.props.ownerId
	}

	get options(): Option[] {
		return this.props.options
	}

	get pageId(): string {
		return this.props.pageId
	}

	get duration() {
		return this.props.duration
	}

	vote(optionId: string, vote: Vote): Either<VoteErrors, void> {
		if (this.isFinished()) {
			return left(new PollAlreadyFinishedError(this.title.value))
		}

		const option = this.options.find(opt => opt.id === optionId)

		if (!option) {
			return left(new NotFoundError('Option', optionId))
		}

		option.addVote(vote)
	}

	isFinished(): boolean {
		if (this.duration.type === 'temporary') {
			const today = new Date()
			// today.setHours(0, 0, 0, 0)

			return this.duration.endDate <= today
		}

		return false
	}

	showResults(): Results {
		const totalVotes = this.options.reduce((acc, option) => acc + option.votes.length, 0)

		const results = this.options.map(({ name, votes }) => ({
			name,
			percentage: +((votes.length / totalVotes) * 100).toFixed(1)
		}))

		return results
	}

	addOption(option: Option): Either<AddOptionErrors, void> {
		if (this.isFinished()) {
			return left(new PollAlreadyFinishedError(this.title.value))
		}

		const alreadyExists = this.options.find(opt => opt.name === option.name)

		if (alreadyExists) {
			return left(new AlreadyExistsError('option name', option.name))
		}

		this.props.options.push(option)
	}

	removeOption(optionId: string, memberId: string): Either<RemoveOptionErrors, void> {
		if (this.ownerId !== memberId) {
			return left(new UnauthorizedError())
		}

		if (this.isFinished()) {
			return left(new PollAlreadyFinishedError(this.title.value))
		}

		const exists = this.options.find(opt => opt.id === optionId)
		if (!exists) {
			return left(new NotFoundError('Option', optionId))
		}

		this.props.options = this.props.options.filter(opt => opt.id !== optionId)
	}

	static create(props: IPollProps, id?: string, createdAt?: Date): Poll {
		const poll = new Poll(props, id, createdAt)
		return poll
	}
}
