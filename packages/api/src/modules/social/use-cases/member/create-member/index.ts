import { CreateMemberUseCase } from './create-member-use-case'
import { inMemoryMembersRepositoryInstance } from 'modules/social/repositories/implementations/in-memory-member-repository'
import { inMemoryUserRepositoryInstace } from 'modules/accounts/repositories/in-memory/in-memory-user-repository'

const createMemberUseCase = new CreateMemberUseCase(inMemoryMembersRepositoryInstance, inMemoryUserRepositoryInstace)

export { createMemberUseCase }