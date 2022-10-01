import { InMemoryMemberRepository } from '../../../../infra/repositories/in-memory/member-repository'
import { IMemberRepository } from '../../../../domain/member/repository'
import { GetMemberByUsernameUseCase } from './get-member-by-username-use-case'
import { MemberFactories } from 'modules/social/sut-factories/member-factories'
import { Member } from 'modules/social/domain/member'
import { NotFoundError } from 'shared/errors/not-found-error'

describe('UseCase - get member by username', () => {
	const { makeMember } = MemberFactories

	let getMemberByUsernameUseCase: GetMemberByUsernameUseCase
	let memberRepository: IMemberRepository

	beforeEach(() => {
		memberRepository = new InMemoryMemberRepository()
		getMemberByUsernameUseCase = new GetMemberByUsernameUseCase(memberRepository)
	})

	it('should retrieve a member', async () => {
		const member = makeMember()

		memberRepository.save(member)

		const result = await getMemberByUsernameUseCase.execute({ username: member.username.value })

        expect(result.value).toBeInstanceOf(Member)
        expect(result.value).toHaveProperty('id', member.id)
        expect(result.value).toHaveProperty('username', member.username)
	})

    it('should not retrieve a member that doest not exists', async () => {
        const result = await getMemberByUsernameUseCase.execute({ username: 'itachi' })

        expect(result.value).toBeInstanceOf(NotFoundError)
        expect(result.value).toStrictEqual(new NotFoundError('Member', 'itachi'))
    })
})
