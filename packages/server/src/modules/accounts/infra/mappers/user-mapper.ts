import { Mapper } from 'shared/contracts/infra/mapper'
import { UnexpectedError } from 'shared/errors/unexpected-error'
import { Email, Password, User, Username } from '../../domain/user'
import { UserDTO } from '../../application/dtos/user-dto'

interface PersistenceUser {
	id: string
	username: string
	email: string
	password: string
	createdAt: Date
	// updatedAt: Date
}

class UserMapperClass implements  Mapper<User, PersistenceUser, UserDTO> {
	toDomain(rawData: PersistenceUser): User | Error {
		const { id, username, email, password, createdAt } = rawData

		const usernameOrError = Username.create({ value: username })
		const emailOrError = Email.create({ value: email })
		const passwordOrError = Password.create({ value: password })

		if (usernameOrError.isLeft()) return new UnexpectedError()
		if (emailOrError.isLeft()) return new UnexpectedError()
		if (passwordOrError.isLeft()) return new UnexpectedError()

		const user = User.create(
			{
				username: usernameOrError.value,
				email: emailOrError.value,
				password: passwordOrError.value
			},
			id,
			createdAt
		)

        return user
	}

	async toPersistence(entity: User): Promise<PersistenceUser> {
		return {
			id: entity.id,
			username: entity.username.value,
			email: entity.email.value,
			password: await entity.password.getHashedPassword(),
			createdAt: entity.createdAt
		}
	}

	toDTO(entity: User): UserDTO {
		return {
			id: entity.id,
			username: entity.username.value,
			email: entity.email.value
		}
	}
}

const UserMapper = new UserMapperClass()

export { UserMapper }