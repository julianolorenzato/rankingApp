import { IUserRepository } from 'modules/accounts/repositories/user-repository'
import { UseCase } from 'shared/contracts/application/use-case'
import { Member } from '../../../domain/member/member'
import { Either, left } from 'shared/logic/either'
import { IMemberRepository } from '../../../repositories/member-repository'
import { AlreadyExistsError } from 'shared/errors/already-exists-error'

type Input = {
	userId: string
}

type Output = Either<AlreadyExistsError, void>

export class CreateMemberUseCase implements UseCase<Input, Output> {
	private memberRepository: IMemberRepository
	private userRepository: IUserRepository

	constructor(memberRepo: IMemberRepository, usersRepo: IUserRepository) {
		this.memberRepository = memberRepo
		this.userRepository = usersRepo
	}

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

        await this.memberRepository.save(member)
	}
}
