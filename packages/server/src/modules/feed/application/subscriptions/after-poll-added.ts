import { IHandler } from 'shared/contracts/domain/event-handler'
import { EventDispatcher } from 'shared/events/event-dispatcher'
import { PollAdded } from 'modules/social/domain/page/events/poll-added'
import { FeedService } from '../services/feed-service'
import { PostService } from '../services/post-service'

export class AfterPollAdded implements IHandler<PollAdded> {
	private feedService: FeedService
	private postService: PostService

	constructor(feedService: FeedService, postService: PostService) {
		this.setupSubscriptions()
		this.feedService = feedService
		this.postService = postService
	}

	setupSubscriptions(): void {
		EventDispatcher.registerHandlerToEvent(this, PollAdded.name)
	}

	async handle(event: PollAdded): Promise<void> {
		const { poll } = event

		try {
			const post = await this.postService.createPost({ poll })

			await this.feedService.addPostToFeeds({ memberIds: [], post })

			console.log(
				`[AfterPollAdded]: Successfully executed CreateContent and IncreaseFeeds use cases AfterPollAdded`
			)
		} catch (err) {
			console.log(err)
			console.log(
				`[AfterPollAdded]: Failed to execute CreateContent or IncreaseFeeds use cases AfterPollAdded.`
			)
		}
	}
}
