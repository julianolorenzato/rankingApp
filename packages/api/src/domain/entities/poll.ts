import { User } from '@/domain/entities/user/user'
import { Vote } from '@/domain/entities/vote'

type PollProps = {
	owner: User
	options: string[]
	votes: Vote[]
	createdAt: Date
}

export class Poll {
	private _id
	props

	private constructor(props: PollProps, id: string) {
		this.props = props
		this._id = id
	}

	static new(props: PollProps, id: string) {
		const poll = new Poll(props, id)
		return poll
	}
}
