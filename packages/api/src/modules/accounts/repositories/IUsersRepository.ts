import { User } from '../entities/User'

export interface IUsersRepository {
	findByUsername(username: string): Promise<User>
	findByEmail(email: string): Promise<User>
	save(user: User): Promise<void>
}
