import { inMemoryMemberRepositoryInstance } from 'modules/social/infra/repositories/in-memory/member-repository'
import { GetMemberByUsernameUseCase } from './get-member-by-username-use-case'
import { GetMemberByUsernameController } from './get-member-by-username-controller'

const getMemberByUsernameUseCase = new GetMemberByUsernameUseCase(inMemoryMemberRepositoryInstance)
const getMemberByUsernameController = new GetMemberByUsernameController(getMemberByUsernameUseCase)

export { getMemberByUsernameController }
