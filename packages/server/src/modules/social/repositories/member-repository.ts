import { Member } from "../domain/member/member"

export interface IMemberRepository {
    findAll(amount: number): Promise<Member[] | null>
	findByUserId(id: string): Promise<Member | null>	
	findByUsername(username: string): Promise<Member | null>	
	save(member: Member): Promise<void>
}
