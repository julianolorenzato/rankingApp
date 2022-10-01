import { Feed } from "../feed"

export interface IFeedRepository {
	save(feed: Feed): Promise<void>
	findByMemberId(memberId: string): Promise<Feed | null>
	bulkFindByMemberId(memberIds: string[]): Promise<Feed[] | null>
}
