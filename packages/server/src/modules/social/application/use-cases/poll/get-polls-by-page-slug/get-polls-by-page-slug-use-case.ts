import { Poll } from 'modules/social/domain/poll/poll'
import { IPageRepository } from 'modules/social/domain/page/repository'
import { IPollRepository } from 'modules/social/domain/poll/repository'
import { UseCase } from 'shared/contracts/application/use-case'
import { NotFoundError } from 'shared/errors/not-found-error'
import { Either, left, right } from 'shared/logic/either'

type Input = {
	slug: string
}

type Output = Either<NotFoundError, Poll[]>

export class GetPollsByPageSlugUseCase implements UseCase<Input, Output> {
	constructor(private pollRepository: IPollRepository, private pageRepository: IPageRepository) {}

	async execute({ slug }: Input): Promise<Output> {
		const page = await this.pageRepository.findBySlug(slug)
		if (!page) {
			return left(new NotFoundError('Page', slug))
		}

		const polls = await this.pollRepository.findByPageId(page.id)

		return right(polls)
	}
}
