import { Member } from "modules/social/domain/member/member"
import { InMemoryMemberRepository } from "modules/social/repositories/implementations/in-memory-member-repository"
import { IMemberRepository } from "modules/social/repositories/member-repository"
import { MemberFactories } from "modules/social/sut-factories/member-factories"
import { GetMembersUseCase } from './get-members-use-case'

describe('UseCase - get members', () => {
	const { makeMember } = MemberFactories

	let getMembersUseCase: GetMembersUseCase
	let memberRepository: IMemberRepository

	beforeEach(() => {
		memberRepository = new InMemoryMemberRepository()
		getMembersUseCase = new GetMembersUseCase(memberRepository)
	})

	it('should retrieve all members', async () => {
		const member1 = makeMember()
		const member2 = makeMember()
		const member3 = makeMember()
		const member4 = makeMember()
		const member5 = makeMember()

		memberRepository.save(member1)
		memberRepository.save(member2)
		memberRepository.save(member3)
		memberRepository.save(member4)
		memberRepository.save(member5)

		const result = await getMembersUseCase.execute()

        expect(result).toEqual([member1, member2, member3, member4, member5])
	})
})