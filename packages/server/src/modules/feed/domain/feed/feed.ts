import { AggregateRoot } from 'shared/contracts/domain/aggregate-root'
import { MemberId } from 'shared/contracts/domain/ids'
import { Content } from '../content/content'

interface IFeedProps {
	memberId: MemberId
	contents: Content[]
}

export class Feed extends AggregateRoot<IFeedProps> {
	private constructor(props: IFeedProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt)
	}

	get memberId(): string {
		return this.props.memberId
	}

	get contents(): Content[] {
		return this.props.contents
	}

	// private calculateScore(poll: Poll): void {}

	// private removeExcedentPolls(): void {
	// 	this.props.polls.sort((a, b) => )
	// }

	// private rankByScore()

	addNewContent(content: Content) {
		this.props.contents.push(content)
		this.rankByTime()
	}

	addNewContents(contents: Content[]) {
		this.props.contents.push(...contents)
	}

	removeContent(content: Content) {
		this.props.contents = this.props.contents.filter(pst => pst.id !== content.id)
	}

	removeContents(contents: Content[]) {
		for (const content of contents) {
			this.props.contents = this.props.contents.filter(pst => pst.id !== content.id)
		}
	}

	private rankByScore(): void {}

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
