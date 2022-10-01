import { IHandler } from 'shared/contracts/domain/event-handler'
import { EventDispatcher } from 'shared/events/event-dispatcher'
import { PageFollowed } from 'modules/social/domain/page/events/page-followed'
import { FeedService } from '../services/feed-service'
import { PostService } from '../services/post-service'
import { IPollRepository } from 'modules/social/domain/poll/repository'

export class AfterPageFollowed implements IHandler<PageFollowed> {
	private pollRepository: IPollRepository
	private feedService: FeedService
	private postService: PostService

	constructor(feedService: FeedService, postService: PostService, pollRepository: IPollRepository) {
		this.setupSubscriptions()
		this.feedService = feedService
		this.postService = postService
		this.pollRepository = pollRepository
	}

	setupSubscriptions(): void {
		EventDispatcher.registerHandlerToEvent(this, PageFollowed.name)
	}

	async handle(event: PageFollowed): Promise<void> {
		try {
			const { page, follower } = event

			const polls = await this.pollRepository.findByPageId(page.id)

			const posts = await this.postService.bulkCreatePost({ polls })

			await this.feedService.addPostsToFeed({ memberId: follower.id, posts })
			
			console.log(`[AfterPageFollowed]: Successfully executed GenerateFeed use case AfterPageFollowed`)
		} catch (err) {
			console.log(err)
			console.log(`[AfterPageFollowed]: Failed to execute GenerateFeed use case AfterPageFollowed.`)
		}
	}
}
