import { randomUUID } from "crypto"
import { Username } from "modules/accounts/domain/user"
import { Member } from "./member"

describe('Aggregate - member', () => {
	const username = Username.create({ value: 'jakeotaku' }).value as Username

	it('should be able to create a new member', () => {
		const member = Member.create({
            userId: '123456789',
            username,
            reputation: 7
        })

		expect(member).toHaveProperty('id')
		expect(member).toHaveProperty('createdAt')
        expect(member.props).toHaveProperty('reputation', 0)
	})

    it('should be able to create an existing member passing the id', () => {
        const fakeId = randomUUID()

        const existingMember = Member.create({
            userId: '123456789',
			username,
            reputation: 12
		}, fakeId)

        expect(existingMember).toHaveProperty('id')
        expect(existingMember).toHaveProperty('createdAt')
        expect(existingMember.props).toHaveProperty('reputation', 12)
    })
})
