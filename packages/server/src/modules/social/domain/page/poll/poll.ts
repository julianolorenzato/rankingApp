import { Entity } from 'shared/contracts/domain/entity'
import { AlreadyExistsError } from 'shared/errors/already-exists-error'
import { NotFoundError } from 'shared/errors/not-found-error'
import { Either, left, right } from 'shared/logic/either'
import { Member } from '../../member/member'
import { MemberId } from '../../member/member-id'
import { PageId } from '../page/page-id'
import { Option } from './option'
import { OptionVote } from './option-vote'

type Results = {
	name: string
	percentage: number
}[]

export interface IPollProps {
	title: string
	options: Option[]
	owner: MemberId
	pageId: PageId
}

export class Poll extends Entity<IPollProps> {
	private constructor(props: IPollProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt)
	}

	get title(): string {
		return this.props.title
	}

	get options(): Option[] {
		return this.props.options
	}

	showResults(): Results {
		const totalVotes = this.options.reduce((acc, option) => acc + option.votes.length, 0)

		const results = this.options.map(({ name, votes }) => ({
			name,
			percentage: +((votes.length / totalVotes) * 100).toFixed(1)
		}))

		return results
	}

	addOption(option: Option): Either<AlreadyExistsError, void> {
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
