import { IHandler } from 'shared/contracts/domain/event-handler'
import { EventDispatcher } from 'shared/events/event-dispatcher'
import { IncreaseFeedUseCase } from '../use-cases/feed/increase-polls-in-feed/increase-polls-in-feed'
import { PageFollowed } from 'modules/social/domain/page/events/page-followed'

export class AfterPageFollowed implements IHandler<PageFollowed> {
	private increaseFeedUseCase: IncreaseFeedUseCase

	constructor(increaseFeedUseCase: IncreaseFeedUseCase) {
		this.setupSubscriptions()
		this.increaseFeedUseCase = increaseFeedUseCase
	}

	setupSubscriptions(): void {
		EventDispatcher.registerHandlerToEvent(this.handle.bind(this), PageFollowed.name)
	}

	async handle(event: PageFollowed): Promise<void> {
		const { page, follower } = event

		try {
			await this.increaseFeedUseCase.execute({ memberId: follower.id })
			console.log(`[AfterPageFollowed]: Successfully executed GenerateFeed use case AfterPageFollowed`)
		} catch (err) {
			console.log(err)
			console.log(`[AfterPageFollowed]: Failed to execute GenerateFeed use case AfterPageFollowed.`)
		}
	}
}
