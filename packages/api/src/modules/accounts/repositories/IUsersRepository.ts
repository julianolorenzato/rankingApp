import { User } from '../entities/User/User'

export interface IUsersRepository {
	findByUsername(username: string): Promise<User | null>	
	findByEmail(email: string): Promise<User | null>
	save(user: User): Promise<void>
}