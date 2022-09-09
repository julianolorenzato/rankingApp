import { Page } from 'modules/social/domain/page/page'
import { IPageRepository } from '../page-repository'

class InMemoryPageRepository implements IPageRepository {
	public items: Page[] = []

	async findById(pageId: string): Promise<Page | null> {
		const page = this.items.find(page => page.id === pageId)

		if (!page) return null

		return page
	}

	async findByTitle(title: string): Promise<Page | null> {
		const page = this.items.find(page => page.title.value === title)

		if (!page) return null

		return page
	}

	async save(page: Page): Promise<void> {
		this.items = this.items.filter(pg => pg.id !== page.id)
		this.items.push(page)
	}

	async findBySlug(slug: string): Promise<Page> {
		const page = this.items.find(pg => pg.slug === slug)

		if (!page) return null

		return page
	}
}

const inMemoryPageRepositoryInstance = new InMemoryPageRepository()

export { inMemoryPageRepositoryInstance }
