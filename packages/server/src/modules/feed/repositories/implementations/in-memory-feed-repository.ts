import { Feed } from 'modules/feed/domain/feed/feed'
import { IFeedRepository } from '../feed-repository'

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
}

export const inMemoryFeedRepositoryInstance = new InMemoryFeedRepository()
