import { randomUUID } from 'crypto'
import { User } from 'modules/accounts/domain/user'
import { InMemoryUserRepository } from 'modules/accounts/repositories/in-memory/in-memory-user-repository'
import { IUserRepository } from 'modules/accounts/repositories/user-repository'
import { InMemoryMemberRepository } from 'modules/social/repositories/implementations/in-memory-member-repository'
import { IMemberRepository } from 'modules/social/repositories/member-repository'
import { CreateMemberUseCase } from './create-member-use-case'
import { UserFactories } from 'modules/accounts/sut-factories/user-factories'
import { AlreadyExistsError } from 'shared/errors/already-exists-error'

describe('UseCase - create member', () => {
    const { makeUser } = UserFactories

    let memberRepository: IMemberRepository
    let userRepository: IUserRepository
	let createMemberUseCase: CreateMemberUseCase

	beforeEach(() => {
        memberRepository = new InMemoryMemberRepository()
        userRepository = new InMemoryUserRepository()
		createMemberUseCase = new CreateMemberUseCase(memberRepository, userRepository)
	})

	it('should create a member', async () => {
        const userId = randomUUID()

        const user = makeUser({}, userId, new Date())
        await userRepository.save(user)

        await createMemberUseCase.execute({ userId })

        const member = await memberRepository.findByUserId(userId)

        expect(member).toBeDefined()
    })

    it('should not create a member that already exists', async () => {
        const userId = randomUUID()

        const user = makeUser({}, userId, new Date())
        await userRepository.save(user)

        await createMemberUseCase.execute({ userId })
        const result = await createMemberUseCase.execute({ userId})

        expect(result.value).toBeInstanceOf(AlreadyExistsError)
    })
})
