import { Poll } from '@/domain/entities/poll'

export class NewPoll {
    constructor(private readonly newPollRepository: NewPollRepository) {}

    exec(): Promise<Poll> {


    }
}