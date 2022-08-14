import { IDomainEvent } from './domain-event'
import { EventsDispatcher } from '../../events/events-dispatcher'
import { Entity } from './entity'

export abstract class AggregateRoot<T> extends Entity<T> {
	private _domainEvents: IDomainEvent[] = []

	get id(): string {
		return this._id
	}

	get domainEvents(): IDomainEvent[] {
		return this._domainEvents
	}

	protected addDomainEvent(domainEvent: IDomainEvent): void {
		this._domainEvents.push(domainEvent)
		EventsDispatcher.markAggregateForDispatch(this)
		this.logDomainEventAdded(domainEvent)
	}

	public clearEvents(): void {
		this._domainEvents.splice(0, this._domainEvents.length)
	}

	private logDomainEventAdded(domainEvent: IDomainEvent): void {
		const thisClass = Reflect.getPrototypeOf(this) as object
		const domainEventClass = Reflect.getPrototypeOf(domainEvent) as object
		console.info(
			`[Domain Event Created]:`,
			thisClass.constructor.name,
			'==>',
			domainEventClass.constructor.name
		)
	}
}
