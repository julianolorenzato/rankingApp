import { IDomainEvent } from 'shared/contracts/domain/domain-event'
import { Poll } from '../poll'

export class PollCreated implements IDomainEvent {
	public dateTimeOccurred: Date
	public poll: Poll

	constructor(poll: Poll) {
		this.dateTimeOccurred = new Date()
		this.poll = poll
	}

	getAggregateId(): string {
		return this.poll.id
	}
}
