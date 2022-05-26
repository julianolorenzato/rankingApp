import { Entity } from '@shared/domain/Entity'
import { PollTitle } from './PollTitle'

type PollProps = {
	title: PollTitle
	description: string
	options: any
	votes: any
	//follow
	//rating
}

export class Poll extends Entity<PollProps> {
	private constructor(props: PollProps, id?: string) {
		super(props, id)
	}
}
