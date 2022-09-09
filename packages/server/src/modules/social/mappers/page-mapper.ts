import { Mapper } from 'shared/contracts/infra/mapper'
import { UnexpectedError } from 'shared/errors/unexpected-error'
import { Page } from '../domain/page/page'
import { PageDescription } from '../domain/page/page-description'
import { PageTitle } from '../domain/page/page-title'
import { IPageDTO } from '../dtos/page-dto'

interface PersistencePage {
	title: string
	description: string
	pollIds: string[]
	followerIds: string[]
	ownerId: string
	id: string
	createdAt: Date
}

class PageMapperClass implements Mapper<Page, PersistencePage, IPageDTO> {
	toDomain(rawData: PersistencePage): Page | Error {
		const { title, description, ownerId, followerIds, pollIds, id, createdAt } = rawData

		const titleOrError = PageTitle.create({ value: title })
		const descriptionOrError = PageDescription.create({ value: description })

		if (titleOrError.isLeft()) return new UnexpectedError()
		if (descriptionOrError.isLeft()) return new UnexpectedError()

		const page = Page.create(
			{
				title: titleOrError.value,
				description: descriptionOrError.value,
				ownerId,
				followerIds,
				pollIds
			},
			id,
			createdAt
		)

		return page
	}

	toPersistence(entity: Page): PersistencePage {
		return {
			title: entity.title.value,
			description: entity.description.value,
			ownerId: entity.ownerId,
			followerIds: entity.followerIds,
			pollIds: entity.pollIds,
			id: entity.id,
			createdAt: entity.createdAt
		}
	}

	toDTO(entity: Page): IPageDTO {
		return {
			title: entity.title.value,
			description: entity.description.value,
			slug: entity.slug,
			ownerId: entity.ownerId,
			followerIds: entity.followerIds,
			pollIds: entity.pollIds,
			id: entity.id,
			createdAt: entity.createdAt
		}
	}
}

const PageMapper = new PageMapperClass()

export { PageMapper }
