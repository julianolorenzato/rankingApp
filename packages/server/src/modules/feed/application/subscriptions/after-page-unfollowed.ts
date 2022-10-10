import { IHandler } from 'shared/contracts/domain/event-handler'
import { EventDispatcher } from 'shared/events/event-dispatcher'
import { PageFollowed } from 'modules/social/domain/page/events/page-followed'
import { FeedService } from '../services/feed-service'
import { IPollRepository } from 'modules/social/domain/poll/repository'
import { IContentRepository } from 'modules/feed/domain/content/repository'

export class AfterPageUnfollowed implements IHandler<PageFollowed> {
	private pollRepository: IPollRepository
	private contentRepository: IContentRepository
	private feedService: FeedService

	constructor(feedService: FeedService, pollRepository: IPollRepository, contentRepository: IContentRepository) {
		this.setupSubscriptions()
		this.feedService = feedService
		this.pollRepository = pollRepository
		this.contentRepository = contentRepository
	}

	setupSubscriptions(): void {
		EventDispatcher.registerHandlerToEvent(this, PageFollowed.name)
	}

	async handle(event: PageFollowed): Promise<void> {
		try {
			const { page, follower } = event

			const polls = await this.pollRepository.findByPageId(page.id)
			const pollIds = polls.map(poll => poll.id)

			const contents = await this.contentRepository.bulkFindByPollId(pollIds)

			await this.feedService.removeContentsFromFeed({ memberId: follower.id, contents })
			
			console.log(`[AfterPageFollowed]: Successfully executed GenerateFeed use case AfterPageFollowed`)
		} catch (err) {
			console.log(err)
			console.log(`[AfterPageFollowed]: Failed to execute GenerateFeed use case AfterPageFollowed.`)
		}
	}
}
