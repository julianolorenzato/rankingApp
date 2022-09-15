import { createFeedUseCase } from '../use-cases/create-feed'
import { AfterMemberCreated } from './after-member-created'

new AfterMemberCreated(createFeedUseCase)
