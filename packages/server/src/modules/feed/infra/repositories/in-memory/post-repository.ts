import { Post } from 'modules/feed/domain/post/post'
import { IPostRepository } from 'modules/feed/domain/post/repository'

export class InMemoryPostRepository implements IPostRepository {
	public items: Post[] = []

    async save(post: Post): Promise<void> {
        this.items = this.items.filter(pt => pt.id !== post.id)
		this.items.push(post)
    }
}

export const inMemoryPostRepositoryInstance = new InMemoryPostRepository()
