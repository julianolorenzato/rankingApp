import { Member } from 'modules/social/domain/member/member'
import { IMemberRepository } from 'modules/social/repositories/member-repository'
import { UseCase } from 'shared/contracts/application/use-case'

type Output = Member[]

export class GetMembersUseCase implements UseCase<null, Output> {
	constructor(private membersRepository: IMemberRepository) {}

	async execute(): Promise<Output> {
		const members = await this.membersRepository.findAll()

		return members
	}
}
