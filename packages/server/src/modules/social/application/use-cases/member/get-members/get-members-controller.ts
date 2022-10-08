import { IMemberDTO, toMemberDTO } from 'modules/social/application/dtos/member-dto'
import { Controller } from 'shared/contracts/infra/controller'
import { GetMembersUseCase } from './get-members-use-case'

export class GetMembersController extends Controller<null, IMemberDTO[]> {
	constructor(private getMembersUseCase: GetMembersUseCase) {
		super()
	}

	async handle() {
		const output = await this.getMembersUseCase.execute()

		const response = output.map(member => toMemberDTO(member))

		return this.ok(response)
	}
}
