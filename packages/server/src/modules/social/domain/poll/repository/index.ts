import { Poll } from '../poll'

export interface IPollRepository {
	save: (poll: Poll) => Promise<void>
	findById: (id: string) => Promise<Poll | null>
	findByPageId: (pageId: string) => Promise<Poll[]>
}
