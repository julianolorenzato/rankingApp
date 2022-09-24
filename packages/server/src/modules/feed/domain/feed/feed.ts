import { Poll } from 'modules/social/domain/poll/poll'
import { AggregateRoot } from 'shared/contracts/domain/aggregate-root'
import { MemberId } from 'shared/contracts/domain/ids'
import { Post } from './post'

interface IFeedProps {
	memberId: MemberId
	posts: Post[]
}

export class Feed extends AggregateRoot<IFeedProps> {
	private constructor(props: IFeedProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt)
	}

	get memberId(): string {
		return this.props.memberId
	}

	get posts(): Post[] {
		return this.props.posts
	}

	// private calculateScore(poll: Poll): void {}

	// private removeExcedentPolls(): void {
	// 	this.props.polls.sort((a, b) => )
	// }

	// private rankByScore()

	addNewPost(post: Post) {
		this.props.posts.push(post)
		this.rankByTime()
	}

	addNewPosts(posts: Post[]) {
		this.props.posts.push(...posts)
	}

	private rankByScore(): void {

	}

	private rankByTime(): void {
		this.props.contents.sort((a, b) => a.createdAt.getMilliseconds() - b.createdAt.getMilliseconds())
	}

	private rank(): void {
		this.rankByScore()
	}

	static create(props: IFeedProps, id?: string, createdAt?: Date) {
		const feed = new Feed(props, id, createdAt)
		feed.rankByTime()

		return feed
	}
}
