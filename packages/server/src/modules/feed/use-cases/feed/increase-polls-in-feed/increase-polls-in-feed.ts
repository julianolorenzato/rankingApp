import { Post } from "modules/feed/domain/feed/post";
import { Feed } from "modules/feed/domain/feed/feed";
import { IFeedRepository } from "modules/feed/repositories/feed-repository";
import { UseCase } from "shared/contracts/application/use-case";
import { Either } from "shared/logic/either";

type Input = {
    memberId: string
    polls: Post[]
}

type Output = Either<Error, Feed>

export class IncreasePollsInFeedUseCase implements UseCase<Input, Output> {
    constructor(private feedRepository: IFeedRepository) { }

    async execute(data: Input): Promise<Output> {
        const { memberId, posts } = data

        const feed = await this.feedRepository.findByMemberId(memberId)
        feed.addNewPosts(posts)
    }
}