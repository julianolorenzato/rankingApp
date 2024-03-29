import { PageService } from 'modules/social/domain/page/services/page-service'
import { IMemberRepository } from 'modules/social/domain/member/repository'
import { IPageRepository } from 'modules/social/domain/page/repository'
import { UseCase } from 'shared/contracts/application/use-case'
import { NotFoundError } from 'shared/errors/not-found-error'
import { EventDispatcher } from 'shared/events/event-dispatcher'
import { Either, left } from 'shared/logic/either'

type Input = {
	pageId: string
	userId: string
}

type Output = Either<NotFoundError, void>

export class FollowPageUseCase implements UseCase<Input, Output> {
	constructor(private memberRepository: IMemberRepository, private pageRepository: IPageRepository) {}

	async execute(data: Input): Promise<Output> {
		const { userId, pageId } = data

		const member = await this.memberRepository.findByUserId(userId)
		if (!member) {
			return left(new NotFoundError('Member', `of userId ${userId}`))
		}

		const page = await this.pageRepository.findById(pageId)
		if (!page) {
			return left(new NotFoundError('Page', pageId))
		}

		const result = PageService.followAPage(page, member)

		if (result?.isLeft()) {
			const error = result.value
			return left(error)
		}

		EventDispatcher.dispatchEventsForAggregate(page.id)

		await this.memberRepository.save(member)
		await this.pageRepository.save(page)
	}
}
