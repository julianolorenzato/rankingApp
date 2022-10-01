import { IHandler } from 'shared/contracts/domain/event-handler'
import { EventDispatcher } from 'shared/events/event-dispatcher'
import { MemberCreated } from 'modules/social/domain/member/events/member-created'
import { FeedService } from '../services/feed-service'

export class AfterMemberCreated implements IHandler<MemberCreated> {
	private feedService: FeedService

	constructor(feedService: FeedService) {
		this.setupSubscriptions()
		this.feedService = feedService
	}

	setupSubscriptions(): void {
		EventDispatcher.registerHandlerToEvent(this, MemberCreated.name)
	}

	async handle(event: MemberCreated): Promise<void> {
		const { member } = event

		try {
			await this.feedService.createFeed({ memberId: member.id })
			console.log(`[AfterMemberCreated]: Successfully executed CreateFeedHandler AfterMemberCreated`)
		} catch (err) {
			console.log(err)
			console.log(`[AfterMemberCreated]: Failed to execute CreateFeedHandler AfterMemberCreated.`)
		}
	}
}
