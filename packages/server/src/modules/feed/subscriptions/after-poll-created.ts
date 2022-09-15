import { IHandler } from 'shared/contracts/domain/event-handler'
import { EventsDispatcher } from 'shared/events/events-dispatcher'
import { PollCreated } from 'modules/social/domain/poll/events/poll-created'
import { GenerateFeedUseCase } from '../use-cases/generate-feeds (by-created-poll)/generate-feeds-use-case'

export class AfterPollCreated implements IHandler {
	private generateFeedUseCase: GenerateFeedUseCase

	constructor(generateFeedUseCase: GenerateFeedUseCase) {
		this.setupSubscriptions()
		this.generateFeedUseCase = generateFeedUseCase
	}

	setupSubscriptions(): void {
		EventsDispatcher.registerHandlerToEvent(this.handle.bind(this), PollCreated.name)
	}

	async handle(event: PollCreated): Promise<void> {
		const { poll } = event

		try {
			await this.generateFeedUseCase.execute({ poll })
			console.log(`[AfterUserRegistered]: Successfully executed CreateMember use case AfterUserRegistered`)
		} catch (err) {
			console.log(err)
			console.log(`[AfterUserRegistered]: Failed to execute CreateMember use case AfterUserRegistered.`)
		}
	}
}
