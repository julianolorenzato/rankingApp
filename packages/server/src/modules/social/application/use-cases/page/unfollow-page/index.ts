import { inMemoryMemberRepositoryInstance } from 'modules/social/infra/repositories/in-memory/member-repository'
import { inMemoryPageRepositoryInstance } from 'modules/social/infra/repositories/in-memory/page-repository'
import { UnfollowPageController } from './unfollow-page-controller'
import { UnfollowPageUseCase } from './unfollow-page-use-case'

const unfollowPageUseCase = new UnfollowPageUseCase(inMemoryPageRepositoryInstance, inMemoryMemberRepositoryInstance)
const unfollowPageController = new UnfollowPageController(unfollowPageUseCase)

export { unfollowPageController }
