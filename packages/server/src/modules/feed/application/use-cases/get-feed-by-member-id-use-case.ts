import { Feed } from 'modules/feed/domain/feed/feed'
import { IFeedRepository } from 'modules/feed/domain/feed/repository'
import { IMemberRepository } from 'modules/social/domain/member/repository'
import { UseCase } from 'shared/contracts/application/use-case'
import { NotFoundError } from 'shared/errors/not-found-error'
import { Either, left, right } from 'shared/logic/either'

type Input = {
	userId: string
}

type Output = Either<NotFoundError, Feed>

export class GetFeedByMemberIdUseCase implements UseCase<Input, Output> {
	constructor(private feedRepository: IFeedRepository, private memberRepository: IMemberRepository) {}

	async execute(data: Input): Promise<Output> {
		const { userId } = data

        const member = await this.memberRepository.findByUserId(userId)
        if (!member) return left(new NotFoundError('Member', `of userId ${userId}`))

        const feed = await this.feedRepository.findByMemberId(member.id)
        if (!feed) return left(new NotFoundError('Feed', `of memberId ${member.id}`))

        return right(feed)
	}
}
