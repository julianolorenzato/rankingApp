import { IDomainEvent } from "shared/domain/events/domain-event"
import { Member } from "../member"

export class MemberCreated implements IDomainEvent {
    public dateTimeOccurred = new Date()
    public member

    constructor (member: Member) {
        this.member = member
    }

    getAggregateId(): string {
        return this.member.id
    }
}