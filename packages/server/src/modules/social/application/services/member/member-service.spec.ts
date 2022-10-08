import { randomUUID } from "crypto"
import { inMemoryUserRepositoryInstace } from "modules/accounts/infra/repositories/in-memory/user-repository"
import { UserFactories } from 'modules/accounts/sut-factories/user-factories'
import { inMemoryMemberRepositoryInstance } from "modules/social/infra/repositories/in-memory/member-repository"
import { AlreadyExistsError } from "shared/errors/already-exists-error"
import { memberService } from "."

describe('App Service - member', () => {
    const { makeUser } = UserFactories

    it('should create a member', async () => {
        const userId = randomUUID()

        const user = makeUser({}, userId, new Date())
        await inMemoryUserRepositoryInstace.save(user)

        await memberService.createMember({ userId })

        const member = await inMemoryMemberRepositoryInstance.findByUserId(userId)

        expect(member).toBeDefined()
    })

    it('should not create a member that already exists', async () => {
        const userId = randomUUID()

        const user = makeUser({}, userId, new Date())
        await inMemoryUserRepositoryInstace.save(user)

        await memberService.createMember({ userId })
        const result = await memberService.createMember({ userId})

        expect(result.value).toBeInstanceOf(AlreadyExistsError)
    })
})