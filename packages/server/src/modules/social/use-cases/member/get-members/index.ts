import { inMemoryMemberRepositoryInstance } from 'modules/social/repositories/implementations/in-memory-member-repository'
import { GetMembersUseCase } from './get-members-use-case'
import { GetMembersController } from './get-members-controller'

const getMembersUseCase = new GetMembersUseCase(inMemoryMemberRepositoryInstance)
const getMembersController = new GetMembersController(getMembersUseCase)

export { getMembersController }
