import { inMemoryMemberRepositoryInstance } from 'modules/social/infra/repositories/in-memory/member-repository'
import { inMemoryPageRepositoryInstance } from 'modules/social/infra/repositories/in-memory/page-repository'
import { inMemoryPollRepositoryInstance } from 'modules/social/infra/repositories/in-memory/poll-repository'
import { RemovePollController } from './remove-poll-controller'
import { RemovePollUseCase } from './remove-poll-use-case'

const removePollUseCase = new RemovePollUseCase(
	inMemoryPageRepositoryInstance,
	inMemoryPollRepositoryInstance,
	inMemoryMemberRepositoryInstance
)

const removePollController = new RemovePollController(removePollUseCase)

export { removePollController }
