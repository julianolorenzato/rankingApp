import { IHandler } from 'shared/contracts/domain/event-handler'
import { EventsDispatcher } from 'shared/events/events-dispatcher'
import { MemberCreated } from 'modules/social/domain/member/events/member-created'
import { CreateFeedUseCase } from '../use-cases/feed/create-feed/create-feed-use-case'

export class AfterMemberCreated implements IHandler<MemberCreated> {
	private createFeedUseCase: CreateFeedUseCase

	constructor(createFeedUseCase: CreateFeedUseCase) {
		this.setupSubscriptions()
		this.createFeedUseCase = createFeedUseCase
	}

	setupSubscriptions(): void {
		EventsDispatcher.registerHandlerToEvent(this.handle.bind(this), MemberCreated.name)
	}

	async handle(event: MemberCreated): Promise<void> {
		const { member } = event

		try {
			await this.createFeedUseCase.execute({ memberId: member.id })
			console.log(`[AfterMemberCreated]: Successfully executed CreateFeed use case AfterMemberCreated`)
		} catch (err) {
			console.log(err)
			console.log(`[AfterMemberCreated]: Failed to execute CreateFeed use case AfterMemberCreated.`)
		}
	}
}
