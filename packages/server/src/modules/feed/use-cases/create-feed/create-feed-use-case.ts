import { Feed } from 'modules/feed/domain/feed/feed'
import { IFeedRepository } from 'modules/feed/repositories/feed-repository'
import { UseCase } from 'shared/contracts/application/use-case'
import { Either, right } from 'shared/logic/either'

type Input = {
	memberId: string
}

type Output = Either<Error, Feed>

export class CreateFeedUseCase implements UseCase<Input, Output> {
	constructor(private feedRepository: IFeedRepository) {}

	async execute({ memberId }: Input): Promise<Output> {
		const feed = Feed.create({ memberId, polls: [] })

		await this.feedRepository.save(feed)

		return right(feed)
	}
}
