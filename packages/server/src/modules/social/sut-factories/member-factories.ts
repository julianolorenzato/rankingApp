import { randomUUID } from 'crypto'
import { IMemberProps, Member } from '../domain/member/member'
import { UserFactories } from 'modules/accounts/sut-factories/user-factories'

export namespace MemberFactories {
	const { makeUsername } = UserFactories

	export const makeMember = (
		{ username = makeUsername(), reputation = 0, userId = randomUUID() }: Partial<IMemberProps> = {},
		id?: string,
		createdAt?: Date
	) => {
		return Member.create(
			{
				username,
				reputation,
				userId
			},
			id,
			createdAt
		)
	}
}
