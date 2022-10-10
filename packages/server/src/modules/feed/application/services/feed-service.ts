import { Feed } from 'modules/feed/domain/feed/feed'
import { Content } from 'modules/feed/domain/content/content'
import { IFeedRepository } from 'modules/feed/domain/feed/repository'
import { Either, right } from 'shared/logic/either'

type CreateFeedInput = { memberId: string }
type CreateFeedOutput = Either<Error, Feed>

type AddContentToFeedsInput = { memberIds: string[]; content: Content }

type AddContentsToFeedInput = { memberId: string; contents: Content[] }

type RemoveContentFromFeedsInput = { memberIds: string[]; content: Content }

type RemoveContentsFromFeedInput = { memberId: string; contents: Content[] }


export class FeedService {
	constructor(private feedRepository: IFeedRepository) {}

	async createFeed(data: CreateFeedInput): Promise<CreateFeedOutput> {
		const { memberId } = data

		const feed = Feed.create({ memberId, contents: [] })

		await this.feedRepository.save(feed)

		return right(feed)
	}

	async addContentToFeeds(data: AddContentToFeedsInput): Promise<void> {
		const { memberIds, content } = data

		const feeds = await this.feedRepository.bulkFindByMemberId(memberIds)

		for await (const feed of feeds) {
			feed.addNewContent(content)

			await this.feedRepository.save(feed)
		}
	}

	async addContentsToFeed(data: AddContentsToFeedInput): Promise<void> {
		const { memberId, contents } = data

		const feed = await this.feedRepository.findByMemberId(memberId)

		feed.addNewContents(contents)

		await this.feedRepository.save(feed)
	}

	async removeContentFromFeeds(data: RemoveContentFromFeedsInput): Promise<void> {
		const { memberIds, content } = data

		const feeds = await this.feedRepository.bulkFindByMemberId(memberIds)

		for await (const feed of feeds) {
			feed.removeContent(content)

			await this.feedRepository.save(feed)
		}
	}

	async removeContentsFromFeed(data: RemoveContentsFromFeedInput): Promise<void> {
		const { memberId, contents } = data
		
		const feed = await this.feedRepository.findByMemberId(memberId)
		
		feed.removeContents(contents)
		
		await this.feedRepository.save(feed)
	}
}
