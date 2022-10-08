import { Member } from "modules/social/domain/member"

export interface IMemberDTO {
	id: string
	createdAt: Date
	username: string
	userId: string
	reputation: number
	followedPageIds: string[]
}

export function toMemberDTO(entity: Member): IMemberDTO {
	return {
		id: entity.id,
		createdAt: entity.createdAt,
		username: entity.username.value,
		userId: entity.userId,
		reputation: entity.reputation,
		followedPageIds: entity.followedPageIds
	}
}
