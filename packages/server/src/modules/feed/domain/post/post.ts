import { Poll } from 'modules/social/domain/poll/poll'
import { Entity } from 'shared/contracts/domain/entity'

interface CasePoll {
	type: 'poll'
	poll: Poll
}

interface CaseArticle {
	type: 'article'
	article: 'not implemented yet'
}

type IPostProps = CasePoll | CaseArticle

export class Post extends Entity<IPostProps> {
	private constructor(props: IPostProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt)
	}

	get type(): 'poll' | 'article' {
		return this.props.type
	}

	// get score(): number {
	//     return this.calcScore()
	// }

	// private calcScore() {
	//     let score: number

	//     if (value.type === 'poll') {
	//         const poll = value.poll

	//         score = 25
	//         poll.duration.type === 'temporary' ? score += 15 : score += 10
	//     }

	//     return score
	// }

	static create(props: IPostProps, id?: string, createdAt?: Date) {
		const post = new Post(props, id, createdAt)
		// post.calcScore()

		return post
	}
}
