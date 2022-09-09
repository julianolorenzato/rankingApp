import { randomUUID } from "crypto"
import { Vote } from "./vote"

describe('Entity - vote', () => {
    it('should create an vote', () => {
        const vote = Vote.create({
            optionId: randomUUID(),
            memberId: randomUUID(),
            pollId: randomUUID()
        })

        expect(vote).toHaveProperty('id')
        expect(vote).toHaveProperty('createdAt')
    })
})