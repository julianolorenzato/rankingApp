import { Entity } from 'shared/contracts/domain/entity'
import { MemberId } from '../member/member-id'
import { OptionId } from './option-id'
import { PollId } from './poll-id'

interface IOptionVoteProps {
	owner: MemberId
	pollId: PollId
	optionId: OptionId
}

export class OptionVote extends Entity<IOptionVoteProps> {
	private constructor(props: IOptionVoteProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt)
	}

	get owner(): string {
		return this.props.owner
	}

	get pollId(): string {
		return this.props.pollId
	}

	get optionId(): string {
		return this.props.optionId
	}

	static create(props: IOptionVoteProps, id?: string, createdAt?: Date): OptionVote {
		const optionVote = new OptionVote(props, id, createdAt)
		return optionVote
	}
}
