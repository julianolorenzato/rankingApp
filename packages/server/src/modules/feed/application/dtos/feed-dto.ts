import { Feed } from 'modules/feed/domain/feed/feed'
import { toPollDTO } from 'modules/social/application/dtos/poll-dto'
import { MemberId } from 'shared/contracts/domain/ids'
import { IPostDTO } from './post-dto'

export interface IFeedDTO {
	id: string
	createdAt: Date
	memberId: MemberId
	posts: IPostDTO[]
}

export function toFeedDTO(feed: Feed): IFeedDTO {
	return {
		id: feed.id,
		createdAt: feed.createdAt,
		memberId: feed.memberId,
		posts: feed.posts.map(post => ({
			type: post.type,
			article: post.article,
			poll: post.poll ? toPollDTO(post.poll) : undefined
		}))
	}
}
