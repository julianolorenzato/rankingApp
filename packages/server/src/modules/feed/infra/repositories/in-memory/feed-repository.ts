import { Feed } from 'modules/feed/domain/feed/feed'
import { IFeedRepository } from 'modules/feed/domain/feed/repository'

export class InMemoryFeedRepository implements IFeedRepository {
	public items: Feed[] = []

	async save(feed: Feed): Promise<void> {
		this.items = this.items.filter(fd => fd.id !== feed.id)
		this.items.push(feed)
	}

	async findByMemberId(memberId: string): Promise<Feed | null> {
		const feed = this.items.find(feed => feed.memberId === memberId)
		if (!feed) {
			return null
		}

		return feed
	}

	async bulkFindByMemberId(memberIds: string[]): Promise<Feed[]> {
		const feeds: Feed[] = []

		for await(const memberId of memberIds) {
			const feed = this.items.find(fd => fd.memberId === memberId)

			feeds.push(feed)
		}

		return feeds
	}
}

export const inMemoryFeedRepositoryInstance = new InMemoryFeedRepository()
