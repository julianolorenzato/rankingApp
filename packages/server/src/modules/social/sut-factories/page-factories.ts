import { randomUUID } from 'crypto'
import { IPageProps, Page } from '../domain/page/page'
import { IPageDescriptionProps, PageDescription } from '../domain/page/page-description'
import { IPageTitleProps, PageTitle } from '../domain/page/page-title'

export namespace PageFactories {
	export const makePageTitle = ({ value = 'VALORANT' }: Partial<IPageTitleProps> = {}) => {
		return PageTitle.create({
			value
		}).value
	}

	export const makePageDescription = ({
		value = 'Uma pagina para discutir VALORANT'
	}: Partial<IPageDescriptionProps> = {}) => {
		return PageDescription.create({
			value
		}).value
	}

	export const makePage = (
		{
			title = makePageTitle() as PageTitle,
			description = makePageDescription() as PageDescription,
			owner = randomUUID(),
			followers = [],
			polls = []
		}: Partial<IPageProps> = {},
		id?: string,
		createdAt?: Date
	) => {
		return Page.create(
			{
				title,
				description,
				owner,
				followers,
				polls
			},
			id,
			createdAt
		)
	}
}
