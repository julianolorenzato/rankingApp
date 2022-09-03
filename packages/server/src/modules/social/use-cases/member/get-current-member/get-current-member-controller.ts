import { IMemberDTO } from 'modules/social/dtos/member-dto'
import { Controller } from 'shared/contracts/infra/controller'
import { GetMemberByUsernameUseCase } from '../get-member-by-username/get-member-by-username-use-case'

type RequestData = {
	payload: {
		username: string
	}
}

type ResponseDTO = IMemberDTO

export class GetCurrentMemberController extends Controller<RequestData, ResponseDTO> {
	constructor(private getMemberByUsernameUseCase: GetMemberByUsernameUseCase) {
		super()
	}

	async handle(req: RequestData) {
		const { username } = req.payload

		const result = await this.getMemberByUsernameUseCase.execute({ username })

		if (result.isLeft()) {
			const error = result.value

			return this.clientError(error)
		}

		const response: IMemberDTO = {
			id: result.value.id,
			userId: result.value.userId,
			username: result.value.username.value,
			reputation: result.value.reputation,
			createdAt: result.value.createdAt
		}

		return this.ok(response)
	}
}
