import { IMemberRepository } from 'modules/social/domain/member/repository'
import { IPageRepository } from 'modules/social/domain/page/repository'
import { PageService } from 'modules/social/domain/page/services/page-service'
import { IPollRepository } from 'modules/social/domain/poll/repository'
import { UseCase } from 'shared/contracts/application/use-case'
import { NotFoundError } from 'shared/errors/not-found-error'
import { UnauthorizedError } from 'shared/errors/unauthorized-error'
import { Either, left, right } from 'shared/logic/either'

type Errors = NotFoundError | UnauthorizedError

type Input = {
	pageId: string
	pollId: string
	userId: string
}

type Output = Either<Errors, void>

export class RemovePollUseCase implements UseCase<Input, Output> {
	constructor(
		private pageRepository: IPageRepository,
		private pollRepository: IPollRepository,
		private memberRepository: IMemberRepository
	) {}

	async execute(data: Input): Promise<Output> {
		const { pageId, pollId, userId } = data

		const page = await this.pageRepository.findById(pageId)
		if (!page) return left(new NotFoundError('Page', pageId))

		const member = await this.memberRepository.findByUserId(userId)
		if (!member) return left(new NotFoundError('Member', `of user id ${userId}`))

        const poll = await this.pollRepository.findById(pollId)
        if (!poll) return left(new NotFoundError('Poll', pollId))

        const result = PageService.removeAPollFromPage(page, poll, member.id)

        if(result?.isLeft()) return left(result.value)

        await this.pageRepository.save(page)
        await this.pollRepository.save(poll)
        await this.memberRepository.save(member)
	}
}
