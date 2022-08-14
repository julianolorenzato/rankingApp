import { Member } from "modules/social/domain/member/member";
import { IMemberRepository } from "modules/social/repositories/member-repository";
import { UseCase } from "shared/contracts/application/use-case";

type UseCaseRequest = {
    amount: number
}

type UseCaseResponse = Promise<Member[]>

export class GetMembersUseCase implements UseCase<UseCaseRequest, UseCaseResponse>{
    constructor(private membersRepository: IMemberRepository) {}

    async execute({ amount }: UseCaseRequest): UseCaseResponse {
        const members = await this.membersRepository.findAll(amount)

        return members
    }
}