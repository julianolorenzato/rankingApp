import { IDomainEvent } from 'shared/contracts/domain/domain-event'
import { Member } from '../member'

export class MemberCreated implements IDomainEvent {
	public dateTimeOccurred: Date
	public member: Member

	constructor(member: Member) {
		this.dateTimeOccurred = new Date()
		this.member = member
	}

	getAggregateId(): string {
		return this.member.id
	}
}
