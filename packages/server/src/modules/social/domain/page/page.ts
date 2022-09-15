import { AggregateRoot } from 'shared/contracts/domain/aggregate-root'
import { AlreadyExistsError } from 'shared/errors/already-exists-error'
import { NotFoundError } from 'shared/errors/not-found-error'
import { Either, left } from 'shared/logic/either'
import { slugify } from 'shared/logic/slugify'
import { MemberId, PollId } from 'shared/contracts/domain/ids'
import { PageDescription } from './page-description'
import { PageTitle } from './page-title'
import { AlreadyFollowingError } from 'shared/errors/already-following-error'

export interface IPageProps {
	title: PageTitle
	description: PageDescription
	ownerId: MemberId
	followerIds: MemberId[]
	pollIds: PollId[]
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

	get ownerId(): string {
		return this.props.ownerId
	}

	get followerIds(): string[] {
		return this.props.followerIds
	}

	get pollIds(): string[] {
		return this.props.pollIds
	}

	get slug(): string {
		return slugify(this.title.value)
	}

	addPoll(pollId: string): Either<AlreadyExistsError, void> {
		const alreadyExists = this.props.pollIds.some(id => id === pollId)

		if (alreadyExists) {
			return left(new AlreadyExistsError('poll', pollId))
		}

		this.pollIds.push(pollId)
	}

	removePoll(pollId: string): Either<NotFoundError, void> {
		const poll = this.props.pollIds.find(id => id === pollId)

		if (!poll) {
			return left(new NotFoundError('Poll', pollId))
		}

		this.props.pollIds = this.props.pollIds.filter(id => id !== pollId)
	}

	beFollowed(memberId: string): Either<AlreadyFollowingError, void> {
		const alreadyFollowing = this.props.followerIds.find(id => id === memberId)

		if (alreadyFollowing) {
			return left(new AlreadyFollowingError(memberId))
		}

		this.followerIds.push(memberId)
	}

	beUnfollowed(memberId: string): Either<NotFoundError, void> {

	}

	static create(props: IPageProps, id?: string, createdAt?: Date): Page {
		const isNewPage = !id

		const pageProps: IPageProps = isNewPage ? { ...props, followerIds: [], pollIds: [] } : props

		return new Page(pageProps, id, createdAt)
	}
}
