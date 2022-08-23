import { randomUUID } from "crypto"
import { OptionVote } from "./option-vote"

describe('Entity - option vote', () => {
    it('should create an option vote', () => {
        const vote = OptionVote.create({
            optionId: randomUUID(),
            owner: randomUUID(),
            pollId: randomUUID()
        })

        expect(vote).toHaveProperty('id')
        expect(vote).toHaveProperty('createdAt')
    })
})