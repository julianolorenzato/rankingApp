import { IHandler } from 'shared/contracts/domain/event-handler'
import { EventDispatcher } from 'shared/events/event-dispatcher'
import { PollRemoved } from 'modules/social/domain/page/events/poll-removed'
import { FeedService } from '../services/feed-service'
import { IContentRepository } from 'modules/feed/domain/content/repository'

export class AfterPollRemoved implements IHandler<PollRemoved> {
	private feedService: FeedService
	private contentRepository: IContentRepository

	constructor(feedService: FeedService, contentRepository: IContentRepository) {
		this.setupSubscriptions()
		this.feedService = feedService
		this.contentRepository = contentRepository
	}

	setupSubscriptions(): void {
		EventDispatcher.registerHandlerToEvent(this, PollRemoved.name)
	}

	async handle(event: PollRemoved): Promise<void> {
		const { poll } = event

		try {
			const content = await this.contentRepository.findByPollId(poll.id)

            await this.contentRepository.deleteByPollId(poll.id)

			await this.feedService.removeContentFromFeeds({ memberIds: [], content })

			console.info('[Event Handler Tiggered]:', {
				name: AfterPollRemoved.name,
				status: 'SUCCESS',
				description: 'Post created based in the poll and removed to all feeds that follow the poll page'
			})
		} catch (err) {
			console.log(err)
			console.log('[AfterPollRemoved]', {
				status: 'FAILED'
			})
		}
	}
}
