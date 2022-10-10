import { Content } from '../content'

export interface IContentRepository {
	save(content: Content): Promise<void>
	findByPollId(pollId: string): Promise<Content | null>
	bulkFindByPollId(pollIds: string[]): Promise<Content[]>
	deleteByPollId(pollId: string): Promise<void>
}
