import { feedService, postService } from '../services'
import { AfterMemberCreated } from './after-member-created'
import { AfterPollAdded } from './after-poll-added'
import { AfterPageFollowed } from './after-page-followed'
import { inMemoryPollRepositoryInstance } from 'modules/social/infra/repositories/in-memory/poll-repository'

new AfterMemberCreated(feedService)
new AfterPollAdded(feedService, postService)
new AfterPageFollowed(feedService, postService, inMemoryPollRepositoryInstance)
console.log(postService.createPost)