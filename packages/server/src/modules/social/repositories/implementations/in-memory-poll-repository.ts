import { Poll } from "modules/social/domain/poll/poll";
import { IPollRepository } from "../poll-repository";

class InMemoryPollRepository implements IPollRepository {
    public items: Poll[] = []

    async save(poll: Poll): Promise<void> {
        this.items = this.items.filter(pl => pl.id !== poll.id)
        this.items.push(poll)
    }
}

const inMemoryPollRepositoryInstance = new InMemoryPollRepository()

export { inMemoryPollRepositoryInstance }