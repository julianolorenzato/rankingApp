import { GetMemberByUsernameUseCase } from './get-member-by-username-use-case'
import { IMemberDTO } from 'modules/social/application/dtos/member-dto'
import { Controller } from 'shared/contracts/infra/controller'
import { MemberMapper } from 'modules/social/infra/mappers/member-mapper'

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

		const response = MemberMapper.toDTO(output.value)

		return this.ok(response)
	}
}
