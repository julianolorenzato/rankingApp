import { IHandler } from 'shared/contracts/domain/event-handler'
import { EventDispatcher } from 'shared/events/event-dispatcher'
import { UserRegistered } from 'modules/accounts/domain/user/events/user-registered'
// import { CreateMemberUseCase } from '../use-cases/member/create-member/create-member-use-case'
import { MemberService } from '../services/member/member-service'

export class AfterUserRegistered implements IHandler<UserRegistered> {
	private memberService: MemberService

	constructor(memberService: MemberService) {
		this.setupSubscriptions()
		this.memberService = memberService
	}

	setupSubscriptions(): void {
		EventDispatcher.registerHandlerToEvent(this.handle.bind(this), UserRegistered.name)
	}

	async handle(event: UserRegistered): Promise<void> {
		const { user } = event

		try {
			await this.memberService.createMember({ userId: user.id })
			console.log(`[AfterUserRegistered]: Successfully executed CreateMember use case AfterUserRegistered`)
		} catch (err) {
			console.log(err)
			console.log(`[AfterUserRegistered]: Failed to execute CreateMember use case AfterUserRegistered.`)
		}
	}
}
