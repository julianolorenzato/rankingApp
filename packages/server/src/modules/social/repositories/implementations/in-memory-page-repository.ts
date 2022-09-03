import { Page } from "modules/social/domain/page/page";
import { IPageRepository } from "../page-repository";

class InMemoryPageRepository implements IPageRepository {
    public items: Page[] = []

    async findByTitle(title: string): Promise<Page | null> {
        const page = this.items.find(page => page.title.value === title)

        if(!page) return null

        return page
    }

    async save(page: Page): Promise<void> {
        this.items.push(page)
    }
}

const inMemoryPageRepository = new InMemoryPageRepository()

export { inMemoryPageRepository }