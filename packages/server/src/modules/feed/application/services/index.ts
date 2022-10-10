import { FeedService } from './feed-service'
import { inMemoryFeedRepositoryInstance } from 'modules/feed/infra/repositories/in-memory/feed-repository'
import { ContentService } from './content-service'
import { inMemoryPostRepositoryInstance } from 'modules/feed/infra/repositories/in-memory/post-repository'

const feedService = new FeedService(inMemoryFeedRepositoryInstance)
const contentService = new ContentService(inmemor)

export { feedService }
export { contentService }
