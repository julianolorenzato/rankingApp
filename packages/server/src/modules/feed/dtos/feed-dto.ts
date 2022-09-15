import { IPollDTO } from 'modules/social/dtos/poll-dto'
import { MemberId } from 'shared/contracts/domain/ids'

export interface IFeedDTO {
	id: string
	createdAt: Date
    memberId: MemberId
	polls: IPollDTO[]
}
