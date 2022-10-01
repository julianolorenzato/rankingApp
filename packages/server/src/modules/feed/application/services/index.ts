import { FeedService } from './feed-service'
import { inMemoryFeedRepositoryInstance } from 'modules/feed/infra/repositories/in-memory/feed-repository'
import { PostService } from './post-service'
import { inMemoryPostRepositoryInstance } from 'modules/feed/infra/repositories/in-memory/post-repository'

const feedService = new FeedService(inMemoryFeedRepositoryInstance)
const postService = new PostService(inMemoryPostRepositoryInstance)

export { feedService }
export { postService }
