import { MemberId } from 'shared/contracts/domain/ids'
import { IPostDTO } from './post-dto'

export interface IFeedDTO {
	id: string
	createdAt: Date
    memberId: MemberId
	posts: IPostDTO[]
}
