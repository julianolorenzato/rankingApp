import { AddPollController } from './add-poll-controller'
import { AddPollUseCase } from './add-poll-use-case'
import { inMemoryPollRepositoryInstance } from 'modules/social/infra/repositories/in-memory/poll-repository'
import { inMemoryMemberRepositoryInstance } from 'modules/social/infra/repositories/in-memory/member-repository'
import { inMemoryPageRepositoryInstance } from 'modules/social/infra/repositories/in-memory/page-repository'

const addPollUseCase = new AddPollUseCase(
	inMemoryPollRepositoryInstance,
	inMemoryMemberRepositoryInstance,
	inMemoryPageRepositoryInstance
)
const addPollController = new AddPollController(addPollUseCase)

export { addPollController }
