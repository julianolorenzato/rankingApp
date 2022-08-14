import { AggregateRoot } from '../contracts/domain/aggregate-root'
import { IDomainEvent } from '../contracts/domain/domain-event'

type HandlerFunction = (event: IDomainEvent) => void | Promise<void>

interface IEventHandlers {
	[eventName: string]: HandlerFunction[]
}

export class EventsDispatcher {
	private static eventHandlers: IEventHandlers = {}
	private static markedAggregates: AggregateRoot<any>[] = []

	static registerHandlerToEvent(handler: HandlerFunction, eventName: string): void {
		if (this.eventHandlers[eventName]) {
			this.eventHandlers[eventName].push(handler)
		} else {
			this.eventHandlers[eventName] = [handler]
		}
	}

	static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
		const aggregateFound = !!this.findMarkedAggregateById(aggregate.id)

		if (!aggregateFound) {
			this.markedAggregates.push(aggregate)
		}
	}

	static dispatchEventsForAggregate(id: string): void {
		const aggregate = this.findMarkedAggregateById(id)

		if (aggregate) {
			this.dispatchAggregateEvents(aggregate)
			aggregate.clearEvents()
			this.removeAggregateFromMarkedDispatchList(aggregate)
		}
	}

	static clearHandlers(): void {
		this.eventHandlers = {}
	}

	static clearMarkedAggregates(): void {
		this.markedAggregates = []
	}

	private static findMarkedAggregateById(id: string): AggregateRoot<any> | null {
		const found = this.markedAggregates.find(aggregate => aggregate.id === id)

		return found || null
	}

	private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
		aggregate.domainEvents.forEach(event => this.dispatch(event))
	}

	private static dispatch(event: IDomainEvent): void {
		const eventName = event.constructor.name
		const handlers = this.eventHandlers[eventName]

		for (let handler of handlers) {
			handler(event)
		}
	}

	private static removeAggregateFromMarkedDispatchList(aggregate: AggregateRoot<any>): void {
		const index = this.markedAggregates.findIndex(a => a.equals(aggregate))

		this.markedAggregates.splice(index, 1)
	}
}
