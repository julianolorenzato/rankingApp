import { Either, left, right } from 'shared/logic/either'
import { UseCase } from 'shared/contracts/application/use-case'

import { Member } from 'modules/social/domain/member/member'

import { IMemberRepository } from 'modules/social/repositories/member-repository'
import { NotFoundError } from 'shared/errors/not-found-error'

type Input = {
	username: string
}

type Output = Either<NotFoundError, Member>

export class GetMemberByUsernameUseCase implements UseCase<Input, Output> {
	constructor(private memberRepository: IMemberRepository) {}

	async execute({ username }: Input): Promise<Output> {
		const member = await this.memberRepository.findByUsername(username)
		const memberNotFound = !member

		if (memberNotFound) {
			return left(new NotFoundError('Member', username))
		}

		return right(member)
	}
}
