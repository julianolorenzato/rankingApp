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

	async handle(req: RequestData) {
		const { username } = req

		const result = await this.getMemberByUsernameUseCase.execute({ username })

		if (result.isLeft()) {
			const error = result.value
			return this.clientError(error)
		}

		const response: IMemberDTO = {
			id: result.value.id,
			userId: result.value.props.userId,
			username: result.value.username.value,
			reputation: result.value.props.reputation,
			createdAt: result.value.createdAt
		}

		return this.ok(response)
	}
}
