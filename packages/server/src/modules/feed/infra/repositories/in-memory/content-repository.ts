import { Content } from 'modules/feed/domain/content/content'
import { IContentRepository } from 'modules/feed/domain/content/repository'

export class InMemoryContentRepository implements IContentRepository {
	public items: Content[] = []

    async save(content: Content): Promise<void> {
        this.items = this.items.filter(ctnt => ctnt.id !== content.id)
		this.items.push(content)
    }

    bulkFindByPollId(pollIds: string[]): Promise<Content[]> {
        
    }
}

export const inMemoryContentRepositoryInstance = new InMemoryContentRepository()
