import { User } from 'modules/accounts/domain/user'
import { IUserRepository } from '../user-repository'

export class InMemoryUserRepository implements IUserRepository {
	public items: User[] = []

	async findById(id: string): Promise<User | null> {
		const user = this.items.find(user => user.id === id)
		if (!user) {
			return null
		}

		return user
	}

	async findByUsername(username: string): Promise<User | null> {
		const user = this.items.find(user => user.username.value === username)
		if (!user) {
			return null
		}

		return user
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = this.items.find(user => user.email.value === email)
		if (!user) {
			return null
		}

		return user
	}

	async save(user: User): Promise<void> {
		this.items.push(user)
	}
}

export const inMemoryUserRepositoryInstace = new InMemoryUserRepository()
