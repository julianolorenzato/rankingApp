import { Member } from '../member'

export interface IMemberRepository {
	findAll(): Promise<Member[] | null>
	findBulkById(followerIds: string[]): Promise<Member[] | null>
	findByUserId(id: string): Promise<Member | null>
	findByUsername(username: string): Promise<Member | null>
	save(member: Member): Promise<void>
}
