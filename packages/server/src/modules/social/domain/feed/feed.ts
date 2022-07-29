import { AggregateRoot } from 'shared/domain/aggregate-root'

interface IFeedProps {
	memberId: string
    pagesIds: string
}

export class Feed extends AggregateRoot<IFeedProps> {
	private constructor(props: IFeedProps, id?: string) {
		super(props)
	}
}
