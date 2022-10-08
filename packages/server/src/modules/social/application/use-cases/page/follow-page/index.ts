import { FollowPageController } from './follow-page-controller'
import { FollowPageUseCase } from './follow-page-use-case'
import { inMemoryMemberRepositoryInstance } from 'modules/social/infra/repositories/in-memory/member-repository'
import { inMemoryPageRepositoryInstance } from 'modules/social/infra/repositories/in-memory/page-repository'

const followPageUseCase = new FollowPageUseCase(inMemoryMemberRepositoryInstance, inMemoryPageRepositoryInstance)
const followPageController = new FollowPageController(followPageUseCase)

export { followPageController }
