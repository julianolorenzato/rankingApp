import { VoteInAPollController } from './vote-in-a-poll-controller'
import { VoteInAPollUseCase } from './vote-in-a-poll-use-case'
import { inMemoryMemberRepositoryInstance } from 'modules/social/repositories/implementations/in-memory-member-repository'
import { inMemoryPollRepositoryInstance } from 'modules/social/repositories/implementations/in-memory-poll-repository'

const voteInAPollUseCase = new VoteInAPollUseCase(inMemoryPollRepositoryInstance, inMemoryMemberRepositoryInstance)
const voteInAPollController = new VoteInAPollController(voteInAPollUseCase)

export { voteInAPollController }
