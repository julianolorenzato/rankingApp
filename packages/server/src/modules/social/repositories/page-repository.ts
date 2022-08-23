import { Page } from '../domain/page/page/page'

export class IPageRepository {
    findByTitle: (title: string) => Promise<Page | null>
    save: (page: Page) => Promise<void>
}