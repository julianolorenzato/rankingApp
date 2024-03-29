import { IDomainEvent } from 'shared/contracts/domain/domain-event'
import { Member } from '../../member'
import { Page } from '../page'

export class PageUnfollowed implements IDomainEvent {
	public dateTimeOccurred: Date
	public follower: Member
	public page: Page

	constructor(follower: Member, page: Page) {
		this.dateTimeOccurred = new Date()
		this.follower = follower
		this.page = page
	}

	public getAggregateId(): string {
		return this.page.id
	}
}
