import { Feed } from "../domain/feed/feed"

export interface IFeedRepository {
	save(feed: Feed): Promise<void>
	findByMemberId(memberId: string): Promise<Feed | null>
}
