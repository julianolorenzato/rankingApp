import { IHandler } from 'shared/contracts/domain/event-handler'
import { EventDispatcher } from 'shared/events/event-dispatcher'
import { PollAdded } from 'modules/social/domain/page/events/poll-added'
import { FeedService } from '../services/feed-service'
import { ContentService } from '../services/content-service'

export class AfterPollAdded implements IHandler<PollAdded> {
	private feedService: FeedService
	private contentService: ContentService

	constructor(feedService: FeedService, contentService: ContentService) {
		this.setupSubscriptions()
		this.feedService = feedService
		this.contentService = contentService
	}

	setupSubscriptions(): void {
		EventDispatcher.registerHandlerToEvent(this, PollAdded.name)
	}

	async handle(event: PollAdded): Promise<void> {
		const { poll } = event

		try {
			const content = await this.contentService.createContent({ poll })

			await this.feedService.addContentToFeeds({ memberIds: [], content })

			console.info('[Event Handler Tiggered]:', {
				name: AfterPollAdded.name,
				status: 'SUCCESS',
				description: 'Post created based in the poll and added to all feeds that follow the poll page'
			})
		} catch (err) {
			console.log(err)
			console.log('[AfterPollAdded]', {
				status: 'FAILED'
			})
		}
	}
}
