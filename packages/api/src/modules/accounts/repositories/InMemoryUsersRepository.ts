import { User } from '@accounts/entities/User'
import { IUsersRepository } from './IUsersRepository'

export class InMemoryUserRepository implements IUsersRepository {
	public items: User[] = []

	async findByUsername(username: string): Promise<User | null> {
		const user = this.items.find(user => user.username === username)
		if (!user) {
			return null
		}

		return user
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = this.items.find(user => user.email === email)
		if (!user) {
			return null
		}

		return user
	}

	async save(user: User): Promise<void> {
		this.items.push(user)
	}
}
