import { GetMemberByUsernameUseCase } from './get-member-by-username-use-case'
import { IMemberDTO } from 'modules/social/dtos/member-dto'
import { Controller } from 'shared/contracts/infra/controller'

type RequestData = {
	username: string
}

export class GetMemberByUsernameController extends Controller<RequestData, IMemberDTO> {
	constructor(private getMemberByUsernameUseCase: GetMemberByUsernameUseCase) {
		super()
	}

	protected async handle(req: RequestData) {
		const { username } = req

		const output = await this.getMemberByUsernameUseCase.execute({ username })

		if (output.isLeft()) {
			const error = output.value
			return this.clientError(error)
		}

		const response: IMemberDTO = {
			id: output.value.id,
			userId: output.value.userId,
			username: output.value.username.value,
			reputation: output.value.reputation,
			createdAt: output.value.createdAt
		}

		return this.ok(response)
	}
}
