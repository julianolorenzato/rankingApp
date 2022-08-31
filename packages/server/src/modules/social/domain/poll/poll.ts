import { Entity } from 'shared/contracts/domain/entity'
import { AlreadyExistsError } from 'shared/errors/already-exists-error'
import { NotFoundError } from 'shared/errors/not-found-error'
import { PollAlreadyFinishedError } from 'shared/errors/poll-already-finished-error'
import { Either, left, right } from 'shared/logic/either'
import { MemberId } from '../member/member-id'
import { PageId } from '../page/page-id'
import { Option } from './option'
import { OptionVote } from './option-vote'
import { PollTitle } from './poll-title'

type AddOptionErrors = PollAlreadyFinishedError | AlreadyExistsError
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
	// readonly finished: boolean
}

export interface IPollProps {
	title: PollTitle
	options: Option[]
	owner: MemberId
	pageId: PageId
	duration: Permanent | Temporary
}

export class Poll extends Entity<IPollProps> {
	private constructor(props: IPollProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt)
	}

	get title(): PollTitle {
		return this.props.title
	}

	get options(): Option[] {
		return this.props.options
	}

	get duration() {
		return this.props.duration
	}

	vote(optionId: string, vote: OptionVote): Either<VoteErrors, void> {
		if(this.isFinished()) {
			return left(new PollAlreadyFinishedError(this.title.value))
		}

		const option = this.options.find(opt => opt.id === optionId)

		if(!option) {
			return left(new NotFoundError('Option', optionId))
		}

		option.addVote(vote)
	}

	isFinished(): boolean {
		if(this.duration.type === 'temporary') {
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
		if(this.isFinished()) {
			return left(new PollAlreadyFinishedError(this.title.value))
		}

		const alreadyExists = this.options.find(opt => opt.name === option.name)

		if (alreadyExists) {
			return left(new AlreadyExistsError('option name', option.name))
		}

		this.options.push(option)
	}

	static create(props: IPollProps, id?: string, createdAt?: Date) {
		const poll = new Poll(props, id, createdAt)
		return poll
	}
}
