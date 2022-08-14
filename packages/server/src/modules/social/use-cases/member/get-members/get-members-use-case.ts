import { Member } from 'modules/social/domain/member/member'
import { IMemberRepository } from 'modules/social/repositories/member-repository'
import { UseCase } from 'shared/contracts/application/use-case'

type Input = {
	amount: number
}

type Output = Member[]

export class GetMembersUseCase implements UseCase<Input, Output> {
	constructor(private membersRepository: IMemberRepository) {}

	async execute({ amount }: Input): Promise<Output> {
		const members = await this.membersRepository.findAll(amount)

		return members
	}
}
