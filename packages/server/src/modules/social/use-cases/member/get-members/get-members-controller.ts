import { IMemberDTO } from 'modules/social/dtos/member-dto'
import { Controller } from 'shared/contracts/infra/controller'
import { GetMembersUseCase } from './get-members-use-case'

export class GetMembersController extends Controller<null, IMemberDTO[]> {
	constructor(private getMembersUseCase: GetMembersUseCase) {
		super()
	}

	async handle() {
		const result = await this.getMembersUseCase.execute()

		const response: IMemberDTO[] = result.map(member => ({
			id: member.id,
			userId: member.props.userId,
			username: member.props.username.value,
			reputation: member.props.reputation,
			createdAt: member.createdAt
		}))

		return this.ok(response)
	}
}
