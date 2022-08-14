import { IDomainEvent } from 'shared/contracts/domain/domain-event'
import { User } from '../user'

export class UserRegistered implements IDomainEvent {
	public dateTimeOccurred: Date
	public user: User

	constructor(user: User) {
		this.dateTimeOccurred = new Date()
		this.user = user
	}

	getAggregateId(): string {
		return this.user.id
	}
}
