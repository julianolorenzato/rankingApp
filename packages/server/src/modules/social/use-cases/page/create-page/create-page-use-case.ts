import { Either, left, right } from 'shared/logic/either'
import { UseCase } from 'shared/contracts/application/use-case'

import { Page } from 'modules/social/domain/page/page'

import { AlreadyExistsError } from 'shared/errors/already-exists-error'
import { InvalidLengthError } from 'shared/errors/invalid-length-error'
import { IPageRepository } from 'modules/social/repositories/page-repository'
import { PageTitle } from 'modules/social/domain/page/page-title'
import { PageDescription } from 'modules/social/domain/page/page-description'

type Errors = InvalidLengthError | AlreadyExistsError

type UseCaseRequest = {
	ownerId: string
	pageTitle: string
	pageDescription: string
}

type UseCaseResponse = Either<Errors, Page>

export class CreatePageUseCase implements UseCase<UseCaseRequest, UseCaseResponse> {
	constructor(private pageRepository: IPageRepository) {}

	async execute(data: UseCaseRequest): Promise<UseCaseResponse> {
		const { pageTitle, pageDescription, ownerId } = data

		const pageTitleOrError = PageTitle.create(pageTitle)
		const pageDescriptionOrError = PageDescription.create(pageDescription)

		if (pageTitleOrError.isLeft()) return left(pageTitleOrError.value)
		if (pageDescriptionOrError.isLeft()) return left(pageDescriptionOrError.value)

        const page = Page.create({
            title: pageTitleOrError.value,
            description: pageDescriptionOrError.value,
            ownerId
        })

        const pageTitleAlreadyExists = await this.pageRepository.findByTitle(page.title)

        if(pageTitleAlreadyExists) {
            return left(new AlreadyExistsError('page title', page.title))
        }

        await this.pageRepository.save(page)

        return right(page)
	}
}
