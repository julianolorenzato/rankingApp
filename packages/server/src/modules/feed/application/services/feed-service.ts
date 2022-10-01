import { Feed } from 'modules/feed/domain/feed/feed'
import { Post } from 'modules/feed/domain/post/post'
import { IFeedRepository } from 'modules/feed/domain/feed/repository'
import { Poll } from 'modules/social/domain/poll'
import { Either, right } from 'shared/logic/either'

type CreateFeedInput = { memberId: string }
type CreateFeedOutput = Either<Error, Feed>

type IncreaseFeedsInput = { memberIds: string[]; post: Post }
type IncreaseFeedsOutput = void

type IncreaseFeedInput = { memberId: string; posts: Post[] }
type IncreaseFeedOutput = void

export class FeedService {
	constructor(private feedRepository: IFeedRepository) {}

	async createFeed(data: CreateFeedInput): Promise<CreateFeedOutput> {
		const { memberId } = data

		const feed = Feed.create({ memberId, posts: [] })

		await this.feedRepository.save(feed)

		return right(feed)
	}
	
	async addPostToFeeds(data: IncreaseFeedsInput): Promise<IncreaseFeedsOutput> {
		const { memberIds, post } = data

		const feeds = await this.feedRepository.bulkFindByMemberId(memberIds)

		for await (const feed of feeds) {
			feed.addNewPost(post)

			await this.feedRepository.save(feed)
		}
	}

	async addPostsToFeed(data: IncreaseFeedInput): Promise<IncreaseFeedOutput> {
		const { memberId, posts } = data

		const feed = await this.feedRepository.findByMemberId(memberId)

		feed.addNewPosts(posts)

		await this.feedRepository.save(feed)
	}
}
