import { Username } from 'modules/accounts/domain/user'
import { Mapper } from 'shared/contracts/infra/mapper'
import { UnexpectedError } from 'shared/errors/unexpected-error'
import { Member } from '../../domain/member'
import { IMemberDTO } from '../../application/dtos/member-dto'

interface PersistenceMember {
	id: string
	createdAt: Date
	username: string
	userId: string
	reputation: number
}

class MemberMapperClass implements Mapper<Member, PersistenceMember, IMemberDTO> {
	toDomain(rawData: PersistenceMember): Member | Error {
		const { id, createdAt, username, userId, reputation } = rawData

		const usernameOrError = Username.create({ value: username })

		if (usernameOrError.isLeft()) return new UnexpectedError()

		const member = Member.create(
			{
				username: usernameOrError.value,
				userId,
				reputation
			},
			id,
			createdAt
		)

		return member
	}

	toPersistence(entity: Member): PersistenceMember {
		return {
			id: entity.id,
			createdAt: entity.createdAt,
			username: entity.username.value,
			userId: entity.userId,
			reputation: entity.reputation
		}
	}

	toDTO(entity: Member): IMemberDTO {
		return {
			id: entity.id,
			createdAt: entity.createdAt,
			username: entity.username.value,
			userId: entity.userId,
			reputation: entity.reputation,
			followedPageIds: entity.followedPageIds
		}
	}
}

const MemberMapper = new MemberMapperClass()

export { MemberMapper }
