import { AggregateRoot } from 'shared/contracts/domain/aggregate-root'
import { AlreadyExistsError } from 'shared/errors/already-exists-error'
import { NotFoundError } from 'shared/errors/not-found-error'
import { UnauthorizedError } from 'shared/errors/unauthorized-error'
import { Either, left } from 'shared/logic/either'
import { slugify } from 'shared/logic/slugify'
import { MemberId } from '../member/member-id'
import { Poll } from '../poll/poll'
import { PageDescription } from './page-description'
import { PageTitle } from './page-title'

export interface IPageProps {
	title: PageTitle
	description: PageDescription
	owner: MemberId
	followers: MemberId[]
	polls: Poll[]
}

export class Page extends AggregateRoot<IPageProps> {
	private constructor(props: IPageProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt)
	}

	get title(): PageTitle {
		return this.props.title
	}

	get description(): PageDescription {
		return this.props.description
	}

	get owner(): string {
		return this.props.owner
	}

	get followers(): string[] {
		return this.props.followers
	}

	get polls(): Poll[] {
		return this.props.polls
	}

	get slug(): string {
		return slugify(this.title.value)
	}

	addPoll(poll: Poll): Either<AlreadyExistsError, void> {
		const alreadyExists = this.props.polls.some(p => p.id === poll.id)

		if (alreadyExists) {
			return left(new AlreadyExistsError('poll', poll.id))
		}

		this.polls.push(poll)
	}

	removePoll(pollId: string, memberId: string): Either<NotFoundError | Error, void> {
		const poll = this.props.polls.find(p => p.id === pollId)

		if (!poll) {
			return left(new NotFoundError('Poll', pollId))
		}

		if (poll.owner !== memberId) {
			return left(new Error('for remove a poll you must be its owner'))
		}

		this.props.polls = this.props.polls.filter(p => p.id !== pollId)
	}

	static create(props: IPageProps, id?: string, createdAt?: Date): Page {
		const isNewPage = !id

		const pageProps: IPageProps = isNewPage ? { ...props, followers: [], polls: [] } : props

		return new Page(pageProps, id, createdAt)
	}
}
