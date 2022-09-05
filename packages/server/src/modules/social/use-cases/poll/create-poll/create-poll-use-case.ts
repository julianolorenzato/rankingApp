import { Option } from 'modules/social/domain/poll/option'
import { Duration, Poll } from 'modules/social/domain/poll/poll'
import { PollTitle } from 'modules/social/domain/poll/poll-title'
import { IMemberRepository } from 'modules/social/repositories/member-repository'
import { IPageRepository } from 'modules/social/repositories/page-repository'
import { IPollRepository } from 'modules/social/repositories/poll-repository'
import { UseCase } from 'shared/contracts/application/use-case'
import { NotFoundError } from 'shared/errors/not-found-error'
import { Either, left, right } from 'shared/logic/either'

type Input = {
	title: string
	ownerId: string
	pageId: string
	duration: Duration
	optionNames: string[]
}

type Output = Either<Error, Poll>

export class CreatePollUseCase implements UseCase<Input, Output> {
	constructor(
		private pollRepository: IPollRepository,
		private memberRepository: IMemberRepository,
		private pageRepository: IPageRepository
	) {}

	async execute(data: Input): Promise<Output> {
		const { title, ownerId, pageId, duration, optionNames } = data

		// If page does not exists return
		const page = await this.pageRepository.findById(pageId)
		if (!page) return left(new NotFoundError('Page', pageId))

		// If title error return
		const titleOrError = PollTitle.create({ value: title })
		if (titleOrError.isLeft()) return left(titleOrError.value)

		// If owner does not exists return
		const member = this.memberRepository.findByUserId(ownerId)
		if (!member) return left(new NotFoundError('Member', ownerId))

		// If option error return
		let validOptions: Option[]
		for (const name of optionNames) {
			const option = Option.create({ name, votes: [] })

			if (option.isLeft()) return left(option.value)

			validOptions.push(option.value)
		}

		const poll = Poll.create({
			title: titleOrError.value,
			owner: ownerId,
			pageId,
			options: validOptions,
			duration
		})

        const possibleError = page.addPoll(poll)
        if(possibleError.isLeft()) return left(possibleError.value)

        await this.pageRepository.save(page)
		await this.pollRepository.save(poll)

		return right(poll)
	}
}
