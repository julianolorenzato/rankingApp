import { User } from '@/domain/entities/user/user'

type VoteProps = {
	votedBy: User
	createdAt: Date
}

export class Vote {
	private _id
	props

	private constructor(props: VoteProps, id: string) {
		this.props = props
		this._id = id
	}

	static new(props: VoteProps, id: string) {
		const vote = new Vote(props, id)
		return vote
	}
}
