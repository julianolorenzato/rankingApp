import { PageFactories } from 'modules/social/sut-factories/page-factories'
import { PollFactories } from 'modules/social/sut-factories/poll-factories'
import { randomUUID } from 'crypto'
import { PollTitle } from '../poll/poll-title'
import { AlreadyExistsError } from 'shared/errors/already-exists-error'
import { NotFoundError } from 'shared/errors/not-found-error'

describe('Agreggate root - page', () => {
	const { makePage } = PageFactories
	const { makePoll, makePollTitle } = PollFactories

	it('should create a new page', () => {
		const page = makePage({
			pollIds: [randomUUID(), randomUUID(), randomUUID()],
			followerIds: [randomUUID(), randomUUID()]
		})

		expect(page.pollIds).toHaveLength(0)
		expect(page.followerIds).toHaveLength(0)
	})

	it('should create an existing page', () => {
		const page = makePage(
			{
				pollIds: [randomUUID(), randomUUID(), randomUUID()],
				followerIds: [randomUUID(), randomUUID()]
			},
			randomUUID(),
			new Date()
		)

		expect(page.pollIds).toHaveLength(3)
		expect(page.followerIds).toHaveLength(2)
	})

	it('should have a correct property slug based on title', () => {
		const titleValue = 'Talking about Déjà vus'

		const page = makePage({
			title: makePollTitle({ value: titleValue }) as PollTitle
		})

		expect(page.slug).toBe('talking-about-deja-vus')
	})

	it('should be able to add a poll that does not exists yet in a page', () => {
		const page = makePage()
		const poll = makePoll()
		
		page.addPoll(poll)
		
		expect(page.pollIds).toHaveLength(1)
		expect(page.pollIds[0]).toBe(poll.id)
	})
	
	it('should not be able to add a poll that already exists in a page', () => {
		const poll = makePoll()
		const page = makePage({ pollIds: [poll.id] }, randomUUID(), new Date())
		
		const result = page.addPoll(poll)
		
		expect(page.pollIds).toHaveLength(1)
		expect(result.value).toBeInstanceOf(AlreadyExistsError)
	})
	
    it('should be able to remove a poll from a page', () => {
		const poll = makePoll()
        const page = makePage({ pollIds: [poll.id] }, randomUUID(), new Date())

        page.removePoll(poll)

        expect(page.pollIds).toHaveLength(0)
    })

    it('should not be able to remove a poll that does not exists in a page', () => {
        const poll1 = makePoll()
        const poll2 = makePoll()
        const page = makePage({ pollIds: [poll1.id] }, randomUUID(), new Date())

        const result = page.removePoll(poll2)

        expect(page.pollIds).toHaveLength(1)
        expect(result.value).toBeInstanceOf(NotFoundError)
    })

    // it('should not be able to remove a poll by a member who does not own it', () => {
    //     const poll = makePoll()
    //     const page = makePage({ polls: [poll] }, randomUUID(), new Date())

    //     const result = page.removePoll(poll.id, randomUUID())

    //     expect(page.polls).toHaveLength(1)
    //     expect((result.value as Error).message).toBe('for remove a poll you must be its owner')
    // })
})
