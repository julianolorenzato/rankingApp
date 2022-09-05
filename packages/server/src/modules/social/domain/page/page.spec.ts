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
			polls: [makePoll(), makePoll(), makePoll()],
			followers: [randomUUID(), randomUUID()]
		})

		expect(page.polls).toHaveLength(0)
		expect(page.followers).toHaveLength(0)
	})

	it('should create an existing page', () => {
		const page = makePage(
			{
				polls: [makePoll(), makePoll(), makePoll()],
				followers: [randomUUID(), randomUUID()]
			},
			randomUUID(),
			new Date()
		)

		expect(page.polls).toHaveLength(3)
		expect(page.followers).toHaveLength(2)
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

		expect(page.polls).toHaveLength(1)
		expect(page.polls[0].id).toBe(poll.id)
	})

	it('should not be able to add a poll that already exists in a page', () => {
		const poll = makePoll()
		const page = makePage({ polls: [poll] }, randomUUID(), new Date())

		const result = page.addPoll(poll)

		expect(page.polls).toHaveLength(1)
		expect(result.value).toBeInstanceOf(AlreadyExistsError)
	})

    it('should be able to remove a poll from a page', () => {
        const memberId = randomUUID()
        const poll = makePoll({ owner: memberId })
        const page = makePage({ polls: [poll] }, randomUUID(), new Date())

        page.removePoll(poll.id, memberId)

        expect(page.polls).toHaveLength(0)
    })

    it('should not be able to remove a poll that does not exists in a page', () => {
        const poll = makePoll()
        const poll2 = makePoll()
        const page = makePage({ polls: [poll] }, randomUUID(), new Date())

        const result = page.removePoll(poll2.id, randomUUID())

        expect(page.polls).toHaveLength(1)
        expect(result.value).toBeInstanceOf(NotFoundError)
    })

    it('should not be able to remove a poll by a member who does not own it', () => {
        const poll = makePoll()
        const page = makePage({ polls: [poll] }, randomUUID(), new Date())

        const result = page.removePoll(poll.id, randomUUID())

        expect(page.polls).toHaveLength(1)
        expect((result.value as Error).message).toBe('for remove a poll you must be its owner')
    })
})
