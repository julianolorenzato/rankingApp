import { Username } from 'modules/accounts/domain/user'
import { AggregateRoot } from 'shared/contracts/domain/aggregate-root'

export interface IMemberProps {
	userId: string
	username: Username
	reputation?: number
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

	static create(props: IMemberProps, id?: string, createdAt?: Date): Member {
		const isNewMember = !id

		const memberProps: IMemberProps = isNewMember ? { ...props, reputation: 0 } : props

		const member = new Member(memberProps, id, createdAt)

		return member
	}
}
