import { Feed } from "modules/feed/domain/feed/feed";
import { IFeedRepository } from "modules/feed/repositories/feed-repository";
import { UseCase } from "shared/contracts/application/use-case";
import { Either } from "shared/logic/either";

type Input = {
    memberId: string
}

type Output = Either<Error, Feed>

export class GenerateFeedUseCase implements UseCase<Input, Output> {
    constructor(private feedRepository: IFeedRepository) { }

    async execute(data: Input): Promise<Output> {
        const { memberId } = data

        const feed = this.feedRepository.findByMemberId(memberId)
    }
}