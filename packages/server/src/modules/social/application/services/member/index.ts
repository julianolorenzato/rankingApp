import { inMemoryMemberRepositoryInstance } from 'modules/social/infra/repositories/in-memory/member-repository'
import { inMemoryUserRepositoryInstace } from 'modules/accounts/infra/repositories/in-memory/user-repository'
import { MemberService } from './member-service'

const memberService = new MemberService(inMemoryMemberRepositoryInstance, inMemoryUserRepositoryInstace)

export { memberService }
