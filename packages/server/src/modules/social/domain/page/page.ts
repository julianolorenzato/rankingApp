import { AggregateRoot } from 'shared/contracts/domain/aggregate-root'
import { PageDescription } from './page-description'
import { PageTitle } from './page-title'

type MemberId = string

interface IPageProps {
	title: PageTitle
	description: PageDescription
	ownerId: MemberId
	followerIds?: MemberId[]
	//polls: Poll[]
}

export class Page extends AggregateRoot<IPageProps> {
	private constructor(props: IPageProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt)
	}

	get title(): PageTitle {
		return this.props.title
	}

	get description(): PageDescription {
		return this.props.description
	}

	get ownerId(): string {
		return this.props.ownerId
	}

	get followersIds(): string[] {
		return this.props.followerIds
	}

	static create(props: IPageProps, id?: string, createdAt?: Date): Page {
		const isNewPage = !id

		const pageProps: IPageProps = isNewPage ? { ...props, followerIds: [] } : props

		return new Page(pageProps, id, createdAt)
	}
}
