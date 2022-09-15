import { Poll } from 'modules/social/domain/poll/poll'
import { AggregateRoot } from 'shared/contracts/domain/aggregate-root'
import { MemberId } from 'shared/contracts/domain/ids'

interface IFeedProps {
	memberId: MemberId
	polls: Poll[]
}

export class Feed extends AggregateRoot<IFeedProps> {
	private constructor(props: IFeedProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt)
	}

	get memberId(): string {
		return this.props.memberId
	}

	get polls(): Poll[] {
		return this.props.polls
	}

	// private calculateScore(poll: Poll): void {}

	// private removeExcedentPolls(): void {
	// 	this.props.polls.sort((a, b) => )
	// }

	private rankByTime(): void {
		this.props.polls.sort((a, b) => a.createdAt.getMilliseconds() - b.createdAt.getMilliseconds())
	}

	static create(props: IFeedProps, id?: string, createdAt?: Date) {
		const feed = new Feed(props, id, createdAt)
		feed.rankByTime()

		return feed
	}
}
