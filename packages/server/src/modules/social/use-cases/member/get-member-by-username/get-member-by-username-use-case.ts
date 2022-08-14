import { Either, left, right } from 'shared/logic/either'
import { UseCase } from 'base/application/use-case'

import { Member } from 'modules/social/domain/member/member'

import { IMemberRepository } from 'modules/social/repositories/member-repository'
import { NotFoundError } from 'shared/errors/not-found-error'

type UseCaseRequest = {
	username: string
}

type UseCaseResponse = Promise<Either<NotFoundError, Member>>

export class GetMemberByUsernameUseCase implements UseCase<UseCaseRequest, UseCaseResponse> {
	constructor(private memberRepository: IMemberRepository) {}

	async execute({ username }: UseCaseRequest): UseCaseResponse {
        const member = await this.memberRepository.findByUsername(username)
        const memberNotFound = !member

        if(memberNotFound) {
            return left(new NotFoundError('Member', username))
        }

        return right(member)
    }
}
