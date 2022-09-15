import { Feed } from 'modules/feed/domain/feed/feed'
import { IFeedRepository } from 'modules/feed/repositories/feed-repository'
import { Poll } from 'modules/social/domain/poll/poll'
import { IMemberRepository } from 'modules/social/repositories/member-repository'
import { IPageRepository } from 'modules/social/repositories/page-repository'
import { UseCase } from 'shared/contracts/application/use-case'
import { NotFoundError } from 'shared/errors/not-found-error'
import { Either, left } from 'shared/logic/either'

type Input = {
    poll: Poll
}

type Output = Either<Error, Feed>

export class GenerateFeedsUseCase implements UseCase<Input, Output> {
    constructor(
        private pageRepository: IPageRepository,
        private memberRepository: IMemberRepository,
        private feedRepository: IFeedRepository
    ) {}

    async execute(data: Input): Promise<Output> {
        const { poll } = data

        const page = await this.pageRepository.findById(poll.pageId)

        // if(!page) {
        //     return left(new NotFoundError('Page', poll.pageId))
        // }

        const { followerIds } = page

        const members = await this.memberRepository.findBulkById(followerIds)

        let feeds: Feed[]

        for await (const member of members) {
            const feed = await this.feedRepository.findByMemberId()
        }


    }
}
