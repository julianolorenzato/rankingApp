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

	static create(props: IOptionVoteProps, id?: string, createdAt?: Date): OptionVote {
		const optionVote = new OptionVote(props, id, createdAt)
		return optionVote
	}
}
