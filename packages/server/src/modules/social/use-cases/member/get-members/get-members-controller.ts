import { IMemberDTO } from 'modules/social/dtos/member-dto'
import { MemberMapper } from 'modules/social/mappers/member-mapper'
import { Controller } from 'shared/contracts/infra/controller'
import { GetMembersUseCase } from './get-members-use-case'

export class GetMembersController extends Controller<null, IMemberDTO[]> {
	constructor(private getMembersUseCase: GetMembersUseCase) {
		super()
	}

	async handle() {
		const output = await this.getMembersUseCase.execute()

		const response = output.map(member => MemberMapper.toDTO(member))

		return this.ok(response)
	}
}
