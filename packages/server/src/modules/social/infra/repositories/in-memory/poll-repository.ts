import { Poll } from 'modules/social/domain/poll/poll'
import { IPollRepository } from 'modules/social/domain/poll/repository'

class InMemoryPollRepository implements IPollRepository {
	public items: Poll[] = []

	async save(poll: Poll): Promise<void> {
		this.items = this.items.filter(pl => pl.id !== poll.id)
		this.items.push(poll)
	}

	async findById(id: string): Promise<Poll> {
		const poll = this.items.find(pl => pl.id === id)
		if (!poll) {
			return null
		}

		return poll
	}

	async findByPageId(pageId: string): Promise<Poll[]> {
		const polls = this.items.filter(poll => poll.pageId === pageId)

		return polls
	}
}

const inMemoryPollRepositoryInstance = new InMemoryPollRepository()

export { inMemoryPollRepositoryInstance }
