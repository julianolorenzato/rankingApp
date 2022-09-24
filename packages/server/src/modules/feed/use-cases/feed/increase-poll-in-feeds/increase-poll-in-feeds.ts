import { Post } from 'modules/feed/domain/feed/post'
import { Feed } from 'modules/feed/domain/feed/feed'
import { IFeedRepository } from 'modules/feed/repositories/feed-repository'
import { Page } from 'modules/social/domain/page/page'
import { IPageRepository } from 'modules/social/repositories/page-repository'
import { UseCase } from 'shared/contracts/application/use-case'
import { NotFoundError } from 'shared/errors/not-found-error'
import { Either, left } from 'shared/logic/either'

type Input = {
    post: Post
}

type Output = Either<Error, Feed>

export class IncreasePollInFeedsUseCase implements UseCase<Input, Output> {
    constructor(
        private pageRepository: IPageRepository,
        private feedRepository: IFeedRepository
    ) { }

    async execute(data: Input): Promise<Output> {
        const { post } = data

        let page: Page

        if (post.value.type === 'poll') {
            const { pageId } = post.value.poll

            page = await this.pageRepository.findById(pageId)

            if (!page) {
                return left(new NotFoundError('Page', pageId))
            }
        }

        const { followerIds } = page

        let feeds: Feed[] = []

        for await (const id of followerIds) {
            const feed = await this.feedRepository.findByMemberId(id)
            feeds.push(feed)
        }

        for (const feed of feeds) {
            feed.addNewPost(post)
        }
    }
}
