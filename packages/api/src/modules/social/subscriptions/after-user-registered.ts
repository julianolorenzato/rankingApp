import { IHandler } from 'shared/domain/events/event-handler'
import { EventsDispatcher } from 'shared/domain/events/events-dispatcher'
import { UserRegistered } from 'modules/accounts/domain/user/events/user-registered'
import { CreateMemberUseCase } from '../use-cases/member/create-member/create-member-use-case'

export class AfterUserRegistered implements IHandler {
	private createMemberUseCase: CreateMemberUseCase

	constructor(createMemberUseCase: CreateMemberUseCase) {
		this.setupSubscriptions()
		this.createMemberUseCase = createMemberUseCase
	}

	setupSubscriptions(): void {
		EventsDispatcher.registerHandlerToEvent(this.handle.bind(this), UserRegistered.name)
	}

	async handle(event: UserRegistered): Promise<void> {
		const { user } = event

		try {
			await this.createMemberUseCase.execute({ userId: user.id })
			console.log(`[AfterUserRegistered]: Successfully executed CreateMember use case AfterUserRegistered`)
		} catch (err) {
			console.log(err)
			console.log(`[AfterUserRegistered]: Failed to execute CreateMember use case AfterUserRegistered.`)
		}
	}
}
