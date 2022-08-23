import { Entity } from 'shared/contracts/domain/entity'
import { NotFoundError } from 'shared/errors/not-found-error'
import { Either, left } from 'shared/logic/either'

type Option = {
	name: string
	votes: number
}

type Results = {
	name: string
	percentage: number
}[]

export interface IPollProps {
	title: string
	options: Option[]
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

	get results(): Results {
		const totalVotes = this.options.reduce((acc, option) => acc + option.votes, 0)

		const results = this.options.map(({ name, votes }) => ({
			name,
			percentage: (votes / totalVotes) * 100
		}))

		return results
	}

	vote(optionName: string): Either<NotFoundError, void> {
		const option = this.options.find(opt => opt.name === optionName)
		
		if(!option) {
			return left(new NotFoundError('option', optionName))
		}

		option.votes += 1
	}

	static create(props: IPollProps, id?: string, createdAt?: Date) {
		const isNew = !id

		const newOptions = props.options.map(opt => ({ ...opt, votes: 0 }))

		props.options = isNew ? newOptions : props.options

		const poll = new Poll(props, id, createdAt)
		return poll
	}
}
