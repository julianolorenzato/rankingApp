import { Entity } from 'shared/contracts/domain/entity'
import { MemberId, OptionId, PollId } from 'shared/contracts/domain/ids'

export interface IVoteProps {
	memberId: MemberId
	pollId: PollId
	optionId: OptionId
}

export class Vote extends Entity<IVoteProps> {
	private constructor(props: IVoteProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt)
	}

	get memberId(): string {
		return this.props.memberId
	}

	get pollId(): string {
		return this.props.pollId
	}

	get optionId(): string {
		return this.props.optionId
	}

	static create(props: IVoteProps, id?: string, createdAt?: Date): Vote {
		const vote = new Vote(props, id, createdAt)
		return vote
	}
}
