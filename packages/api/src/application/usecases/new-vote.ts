import { Vote } from '@/domain/entities/vote'
import { NewVoteRepository } from '../repositories/NewVoteRepository';

export class newVote {
    usersRepository
    constructor(private readonly newVoteRepository: NewVoteRepository) {}

    exec(): Promise<Vote> {
        return this.newVoteRepository.newPoll()
    }
}