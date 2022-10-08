import { Page } from 'modules/social/domain/page'
import { MemberId, PollId } from 'shared/contracts/domain/ids'

export interface IPageDTO {
	title: string
	description: string
	slug: string
	ownerId: MemberId
	followerIds: MemberId[]
	pollIds: PollId[]
	id: string
	createdAt: Date
}

export function toPageDTO(entity: Page): IPageDTO {
	return {
		title: entity.title.value,
		description: entity.description.value,
		slug: entity.slug,
		ownerId: entity.ownerId,
		followerIds: entity.followerIds,
		pollIds: entity.pollIds,
		id: entity.id,
		createdAt: entity.createdAt
	}
}
