import { Page } from '../page'

export interface IPageRepository {
    findByTitle: (title: string) => Promise<Page | null>
    findById: (pageId: string) => Promise<Page | null>
    findBySlug: (slug: string) => Promise<Page | null>
    save: (page: Page) => Promise<void>
}