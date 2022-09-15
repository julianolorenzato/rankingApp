import { Username } from 'modules/accounts/domain/user'
import { AggregateRoot } from 'shared/contracts/domain/aggregate-root'
import { PageId, UserId } from 'shared/contracts/domain/ids'
import { MemberCreated } from './events/member-created'

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
