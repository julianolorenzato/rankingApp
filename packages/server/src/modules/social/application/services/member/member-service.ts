import { IUserRepository } from 'modules/accounts/domain/user/repository'
import { Member } from 'modules/social/domain/member'
import { IMemberRepository } from 'modules/social/domain/member/repository'
import { AlreadyExistsError } from 'shared/errors/already-exists-error'
import { EventDispatcher } from 'shared/events/event-dispatcher'
import { Either, left } from 'shared/logic/either'

type CreateMemberInput = { userId: string }
type CreateMemberOutput = Either<AlreadyExistsError, void>

export class MemberService {
	constructor(private memberRepository: IMemberRepository, private userRepository: IUserRepository) {}

	async createMember(data: CreateMemberInput): Promise<CreateMemberOutput> {
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
