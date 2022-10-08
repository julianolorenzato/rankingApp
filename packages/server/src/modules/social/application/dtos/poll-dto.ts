import { Poll } from 'modules/social/domain/poll'
import { OptionId, PageId, PollId, VoteId } from 'shared/contracts/domain/ids'

interface IVoteDTO {
	memberId: string
	pollId: string
	optionId: string
	id: VoteId
	createdAt: Date
}

interface IOptionDTO {
	name: string
	votes: IVoteDTO[]
	id: OptionId
	createdAt: Date
}

export interface IPollDTO {
	title: string
	ownerId: string
	pageId: PageId
	duration: {
		type: 'permanent' | 'temporary'
		endDate?: Date
	}
	options: IOptionDTO[]
	id: PollId
	createdAt: Date
}

export function toPollDTO(entity: Poll): IPollDTO {
	return {
		id: entity.id,
		createdAt: entity.createdAt,
		title: entity.title.value,
		ownerId: entity.ownerId,
		pageId: entity.pageId,
		duration: entity.duration,
		options: entity.options.map(opt => ({
			id: opt.id,
			createdAt: opt.createdAt,
			name: opt.name,
			votes: opt.votes.map(vt => ({
				id: vt.id,
				createdAt: vt.createdAt,
				memberId: vt.memberId,
				optionId: vt.optionId,
				pollId: vt.pollId
			}))
		}))
	}
}
