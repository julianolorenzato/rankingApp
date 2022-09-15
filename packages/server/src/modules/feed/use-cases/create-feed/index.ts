import { CreateFeedUseCase } from './create-feed-use-case'
import { inMemoryFeedRepositoryInstance } from 'modules/feed/repositories/implementations/in-memory-feed-repository'

const createFeedUseCase = new CreateFeedUseCase(inMemoryFeedRepositoryInstance)

export { createFeedUseCase }