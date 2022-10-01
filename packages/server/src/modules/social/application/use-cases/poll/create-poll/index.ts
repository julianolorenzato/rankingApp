import { CreatePollController } from './create-poll-controller'
import { CreatePollUseCase } from './create-poll-use-case'
import { inMemoryPollRepositoryInstance } from 'modules/social/infra/repositories/in-memory/poll-repository'
import { inMemoryMemberRepositoryInstance } from 'modules/social/infra/repositories/in-memory/member-repository'
import { inMemoryPageRepositoryInstance } from 'modules/social/infra/repositories/in-memory/page-repository'

const createPollUseCase = new CreatePollUseCase(
	inMemoryPollRepositoryInstance,
	inMemoryMemberRepositoryInstance,
	inMemoryPageRepositoryInstance
)
const createPollController = new CreatePollController(createPollUseCase)

export { createPollController }
