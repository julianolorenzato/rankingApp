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
