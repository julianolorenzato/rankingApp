import { IDomainEvent } from 'shared/contracts/domain/domain-event'
import { Poll } from '../../poll/poll'
import { Page } from '../page'

export class PollAdded implements IDomainEvent {
	public dateTimeOccurred: Date
    public poll: Poll
	public page: Page

	constructor(poll: Poll, page: Page) {
		this.dateTimeOccurred = new Date()
		this.poll = poll
		this.page = page
	}

	public getAggregateId(): string {
		return this.page.id
	}
}
