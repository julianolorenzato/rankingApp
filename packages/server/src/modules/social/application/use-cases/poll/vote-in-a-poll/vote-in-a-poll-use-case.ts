import { IMemberRepository } from 'modules/social/domain/member/repository'
import { IPollRepository } from 'modules/social/domain/poll/repository'
import { UseCase } from 'shared/contracts/application/use-case'
import { NotFoundError } from 'shared/errors/not-found-error'
import { Either, left, right } from 'shared/logic/either'
import { Vote } from 'modules/social/domain/poll'

type Input = {
	userId: string
	pollId: string
	optionId: string
}

type Output = Either<NotFoundError, void>

export class VoteInAPollUseCase implements UseCase<Input, Output> {
	constructor(private pollRepositoy: IPollRepository, private memberRepository: IMemberRepository) {}

	async execute(data: Input): Promise<Output> {
		const { userId, pollId, optionId } = data

		const member = await this.memberRepository.findByUserId(userId)
		if (!member) {
			return left(new NotFoundError('Member', userId))
		}

        const poll = await this.pollRepositoy.findById(pollId)
        if (!poll) {
            return left(new NotFoundError('Poll', pollId))
        }

		const vote = Vote.create({
            optionId,
            pollId,
            memberId: member.id
        })

        const possibleError = poll.vote(optionId, vote)
        if(possibleError?.isLeft()) {
            const error = possibleError.value
            return left(error)
        }

        await this.pollRepositoy.save(poll)
	}
}
