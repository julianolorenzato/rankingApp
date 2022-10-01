import { IUserRepository } from 'modules/accounts/repositories/user-repository'
import { UseCase } from 'shared/contracts/application/use-case'
import { Member } from '../../../domain/member/member'
import { Either, left } from 'shared/logic/either'
import { IMemberRepository } from '../../../repositories/member-repository'
import { AlreadyExistsError } from 'shared/errors/already-exists-error'
import { EventDispatcher } from 'shared/events/event-dispatcher'

type Input = {
	userId: string
}

type Output = Either<AlreadyExistsError, void>

export class CreateMemberUseCase implements UseCase<Input, Output> {
	constructor(private memberRepository: IMemberRepository, private userRepository: IUserRepository) {}

	async execute(data: Input): Promise<Output> {
		const { userId } = data

		const user = await this.userRepository.findById(userId)

		const member = Member.create({
			userId,
			username: user.username
		})

		const memberAlreadyExists = await this.memberRepository.findByUserId(userId)

		if (memberAlreadyExists) {
			return left(new AlreadyExistsError('member', `of id ${member.id}`))
		}

		EventDispatcher.dispatchEventsForAggregate(member.id)

		await this.memberRepository.save(member)
	}
}
