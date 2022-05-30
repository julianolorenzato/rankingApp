import { inMemoryMembersRepositoryInstance } from 'modules/social/repositories/implementations/in-memory-member-repository'
import { GetMemberByUsernameUseCase } from './get-member-by-username-use-case'
import { GetMemberByUsernameController } from './get-member-by-username-controller'

const getMemberByUsernameUseCase = new GetMemberByUsernameUseCase(inMemoryMembersRepositoryInstance)
const getMemberByUsernameController = new GetMemberByUsernameController(getMemberByUsernameUseCase)

export { getMemberByUsernameController }
