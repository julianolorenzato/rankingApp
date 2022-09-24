import { Username } from 'modules/accounts/domain/user'
import { AggregateRoot } from 'shared/contracts/domain/aggregate-root'
import { PageId, UserId } from 'shared/contracts/domain/ids'
import { AlreadyFollowingError } from 'shared/errors/already-following-error'
import { NotFoundError } from 'shared/errors/not-found-error'
import { Either, left } from 'shared/logic/either'
import { Page } from '../page/page'
import { MemberCreated } from './events/member-created'
import { PageFollowed } from '../page/events/page-followed'

export interface IMemberProps {
	userId: UserId
	username: Username
	reputation?: number
	followedPageIds?: PageId[]
}

export class Member extends AggregateRoot<IMemberProps> {
	private constructor(props: IMemberProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt)
	}

	get username(): Username {
		return this.props.username
	}

	get reputation(): number {
		return this.props.reputation
	}

	get userId(): string {
		return this.props.userId
	}

	get followedPageIds(): string[] {
		return this.props.followedPageIds
	}

	followPage(page: Page): Either<AlreadyFollowingError, void> {
		const alreadyFollowing = this.props.followedPageIds.find(id => id === page.id)

		if (alreadyFollowing) {
			return left(new AlreadyFollowingError(page.id))
		}

		this.followedPageIds.push(page.id)
	}

	unfollowPage(page: Page): Either<NotFoundError, void> {
		const followedPageId = this.props.followedPageIds.find(id => id === page.id)

		if (!followedPageId) {
			return left(new NotFoundError('Page', page.id))
		}

		this.props.followedPageIds = this.props.followedPageIds.filter(id => id !== page.id)
	}

	static create(props: IMemberProps, id?: string, createdAt?: Date): Member {
		const isNewMember = !id

		const memberProps: IMemberProps = isNewMember
			? {
				...props,
				reputation: 0,
				followedPageIds: []
			}
			: props

		const member = new Member(memberProps, id, createdAt)

		if (isNewMember) {
			member.addDomainEvent(new MemberCreated(member))
		}

		return member
	}
}
