import { createFeedUseCase } from '../use-cases/feed/create-feed'
import { AfterMemberCreated } from './after-member-created'

new AfterMemberCreated(createFeedUseCase)
