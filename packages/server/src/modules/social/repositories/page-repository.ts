import { Page } from '../domain/page/page'

export interface IPageRepository {
    findByTitle: (title: string) => Promise<Page | null>
    findById: (pageId: string) => Promise<Page | null>
    save: (page: Page) => Promise<void>
}