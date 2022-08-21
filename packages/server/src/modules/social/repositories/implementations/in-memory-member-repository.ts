import { Member } from 'modules/social/domain/member/member'
import { IMemberRepository } from '../member-repository'

class InMemoryMemberRepository implements IMemberRepository {
	public items: Member[] = []

	async findAll(): Promise<Member[] | null> {
		const members = this.items
		if (!members) {
			return null
		}

		return members
	}

	async findByUsername(username: string): Promise<Member | null> {
		const member = this.items.find(member => member.username.value === username)
		if (!member) {
			return null
		}

		return member
	}

	async findByUserId(id: string): Promise<Member | null> {
		const member = this.items.find(member => member.props.userId === id)
		if (!member) {
			return null
		}

		return member
	}

	async save(member: Member): Promise<void> {
		this.items.push(member)
	}
}

export const inMemoryMembersRepositoryInstance = new InMemoryMemberRepository()
