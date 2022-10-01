import { Either, left, right } from 'shared/logic/either'
import { UseCase } from 'shared/contracts/application/use-case'

import { Page } from 'modules/social/domain/page/page'

import { AlreadyExistsError } from 'shared/errors/already-exists-error'
import { InvalidLengthError } from 'shared/errors/invalid-length-error'
import { IPageRepository } from 'modules/social/domain/page/repository'
import { PageTitle } from 'modules/social/domain/page/page-title'
import { PageDescription } from 'modules/social/domain/page/page-description'
import { NotFoundError } from 'shared/errors/not-found-error'
import { IMemberRepository } from 'modules/social/domain/member/repository'

type Errors = InvalidLengthError | AlreadyExistsError

type Input = {
	userId: string
	title: string
	description: string
}

type Output = Either<Errors, Page>

export class CreatePageUseCase implements UseCase<Input, Output> {
	constructor(private pageRepository: IPageRepository, private memberRepository: IMemberRepository) {}

	async execute(data: Input): Promise<Output> {
		const { title, description, userId } = data

		const pageTitleOrError = PageTitle.create({ value: title })
		const pageDescriptionOrError = PageDescription.create({ value: description })

		// If title error or description error return
		if (pageTitleOrError.isLeft()) return left(pageTitleOrError.value)
		if (pageDescriptionOrError.isLeft()) return left(pageDescriptionOrError.value)

		// If owner does not exists return
		const member = await this.memberRepository.findByUserId(userId)
		if (!member) return left(new NotFoundError('Member', userId))

		const page = Page.create({
			title: pageTitleOrError.value,
			description: pageDescriptionOrError.value,
			ownerId: member.id,
			followerIds: [],
			pollIds: []
		})

		const pageTitleAlreadyExists = await this.pageRepository.findByTitle(page.title.value)

		if (pageTitleAlreadyExists) {
			return left(new AlreadyExistsError('page title', page.title.value))
		}

		await this.pageRepository.save(page)

		return right(page)
	}
}
