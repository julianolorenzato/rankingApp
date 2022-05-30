import { IDomainEvent } from './domain-event'

// export interface IHandler {
// 	setupSubscriptions(): void
// 	handle(event: IDomainEvent): void
// }

export interface IHandler<T extends IDomainEvent = IDomainEvent> {
	setupSubscriptions(): void
	handle(event: T): void
}
