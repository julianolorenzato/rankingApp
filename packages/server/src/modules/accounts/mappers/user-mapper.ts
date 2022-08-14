import { Mapper } from 'shared/contracts/infra/mapper'
import { User } from '../domain/user'
import { UserDTO } from '../dtos/user-dto'

interface PersistenceUser {
	id: string
	username: string
	email: string
	password: string
	createdAt: Date
	// updatedAt: Date
}

export class UserMapper implements Mapper<User, PersistenceUser, UserDTO> {
	toDomain(rawData: PersistenceUser): User {
        
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
