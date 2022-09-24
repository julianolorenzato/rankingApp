import { IHandler } from 'shared/contracts/domain/event-handler'
import { EventDispatcher } from 'shared/events/event-dispatcher'
import { PollCreated } from 'modules/social/domain/poll/events/poll-created'
import { CreateContentUseCase } from '../use-cases/post/create-post/create-posts-use-case'
import { IncreaseFeedsUseCase } from '../use-cases/feed/increase-poll-in-feeds/increase-poll-in-feeds'

export class AfterPollCreated implements IHandler<PollCreated> {
	private createContentUseCase: CreateContentUseCase
	private increaseFeedsUseCase: IncreaseFeedsUseCase

	constructor(increaseFeedsUseCase: IncreaseFeedsUseCase) {
		this.setupSubscriptions()
		this.increaseFeedsUseCase = increaseFeedsUseCase
	}

	setupSubscriptions(): void {
		EventDispatcher.registerHandlerToEvent(this.handle.bind(this), PollCreated.name)
	}

	async handle(event: PollCreated): Promise<void> {
		const { poll } = event

		try {
			const content = this.createContentUseCase.execute({ poll })
			await this.increaseFeedsUseCase.execute({ content })
			console.log(`[AfterPollCreated]: Successfully executed CreateContent and IncreaseFeeds use cases AfterPollCreated`)
		} catch (err) {
			console.log(err)
			console.log(`[AfterPollCreated]: Failed to execute CreateContent or IncreaseFeeds use cases AfterPollCreated.`)
		}
	}
}
