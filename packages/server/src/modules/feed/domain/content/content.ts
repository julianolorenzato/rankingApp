import { Entity } from 'shared/contracts/domain/entity'

interface CasePoll {
	type: 'poll'
	pollId: string
}

interface CaseArticle {
	type: 'article'
	articleId: string
}

interface CaseAd {
	type: 'ad'
	adId: string
}

type IContentProps = CasePoll | CaseArticle | CaseAd

export class Content extends Entity<IContentProps> {
	private constructor(props: IContentProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt)
	}

	get type(): 'poll' | 'article' | 'ad' {
		return this.props.type
	}

	get pollId(): string {
		if (this.props.type === 'poll') {
			return this.props.pollId
		} else {
			return undefined
		}
	}

	get articleId(): string {
		if (this.props.type === 'article') {
			return this.props.articleId
		} else {
			return undefined
		}
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

	static create(props: IContentProps, id?: string, createdAt?: Date) {
		const content = new Content(props, id, createdAt)
		// content.calcScore()

		return content
	}
}
