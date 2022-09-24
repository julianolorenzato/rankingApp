import { AggregateRoot } from 'shared/contracts/domain/aggregate-root'
import { AlreadyExistsError } from 'shared/errors/already-exists-error'
import { NotFoundError } from 'shared/errors/not-found-error'
import { Either, left } from 'shared/logic/either'
import { slugify } from 'shared/logic/slugify'
import { MemberId, PollId } from 'shared/contracts/domain/ids'
import { PageDescription } from './page-description'
import { PageTitle } from './page-title'
import { AlreadyFollowingError } from 'shared/errors/already-following-error'
import { PageFollowed } from './events/page-followed'
import { PageUnfollowed } from './events/page-unfollowed'
import { Member } from '../member/member'
import { Poll } from '../poll/poll'
import { PollAdded } from './events/poll-added'
import { PollRemoved } from './events/poll-removed'

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

	addPoll(poll: Poll): Either<AlreadyExistsError, void> {
		const alreadyExists = this.props.pollIds.some(id => id === poll.id)

		if (alreadyExists) {
			return left(new AlreadyExistsError('poll', poll.id))
		}

		this.pollIds.push(poll.id)

		this.addDomainEvent(new PollAdded(poll, this))
	}

	removePoll(poll: Poll): Either<NotFoundError, void> {
		const exists = this.props.pollIds.find(id => id === poll.id)

		if (!exists) {
			return left(new NotFoundError('Poll', poll.id))
		}

		this.props.pollIds = this.props.pollIds.filter(id => id !== poll.id)

		this.addDomainEvent(new PollRemoved(poll, this))
	}

	beFollowed(member: Member): Either<AlreadyFollowingError, void> {
		const alreadyFollowing = this.props.followerIds.find(id => id === member.id)

		if (alreadyFollowing) {
			return left(new AlreadyFollowingError(member.id))
		}

		this.followerIds.push(member.id)

		this.addDomainEvent(new PageFollowed(member, this))
	}

	beUnfollowed(member: Member): Either<NotFoundError, void> {
		const followerId = this.props.followerIds.find(id => id === member.id)

		if (!followerId) {
			return left(new NotFoundError('Member', member.id))
		}

		this.props.followerIds = this.props.followerIds.filter(id => id !== member.id)

		this.addDomainEvent(new PageUnfollowed(member, this))
	}

	static create(props: IPageProps, id?: string, createdAt?: Date): Page {
		const isNewPage = !id

		const pageProps: IPageProps = isNewPage ? { ...props, followerIds: [], pollIds: [] } : props

		return new Page(pageProps, id, createdAt)
	}
}
