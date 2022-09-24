import { randomUUID } from 'crypto'
import { AlreadyExistsError } from 'shared/errors/already-exists-error'
import { NotFoundError } from 'shared/errors/not-found-error'
import { PollAlreadyFinishedError } from 'shared/errors/poll-already-finished-error'
import { Duration, Poll } from './poll'
import { PollFactories } from '../../sut-factories/poll-factories'
import { UnauthorizedError } from 'shared/errors/unauthorized-error'

describe('Agreggate root - poll', () => {
	const { makePoll, makePollTitle, makeOption, makeVote } = PollFactories

	it('should create a poll', () => {
		const title = makePollTitle({ value: 'Qual a melhor serie do mundo?' })
		const options = [
			makeOption(
				{
					name: 'Avatar',
					votes: [makeVote(), makeVote(), makeVote()]
				},
				randomUUID(),
				new Date()
			),
			makeOption({ name: 'A Fantástica Fábrica de Chocolate' }),
			makeOption({ name: 'Shrek 3' })
		]
		const duration: Duration = {
			type: 'permanent'
		}

		const poll = makePoll({ title, options, duration }, randomUUID(), new Date())

		expect(poll).toBeInstanceOf(Poll)

		expect(poll).toHaveProperty('id')
		expect(poll).toHaveProperty('createdAt')
		expect(poll).toHaveProperty('title', title)
		expect(poll).toHaveProperty('options', options)
		expect(poll).toHaveProperty('duration', duration)

		expect(poll.options[0].votes.length).toBe(3)
	})

	it('should add an option', () => {
		const poll = makePoll()
		const option = makeOption({ name: 'Anything' })

		const result = poll.addOption(option)

		expect(result).not.toBeDefined()
		expect(poll.options.length).toBe(1)
	})

	it('should not add an option in a poll that has been finished', () => {
		const finishedPoll = makePoll({
			duration: {
				type: 'temporary',
				endDate: new Date()
			}
		})

		const option = makeOption()

		const result = finishedPoll.addOption(option)

		expect(finishedPoll.isFinished()).toBeTruthy()
		expect(result.value).toBeInstanceOf(PollAlreadyFinishedError)
		expect(finishedPoll.options.length).toBe(0)
	})

	it('should not add an option with a name that already exists', () => {
		const poll = makePoll({
			options: [makeOption({ name: 'Gato' })]
		})

		const option = makeOption({ name: 'Gato' })

		const result = poll.addOption(option)

		expect(result.value).toBeInstanceOf(AlreadyExistsError)
		expect(poll.options.length).toBe(1)
	})

	it('should remove an option', () => {
		const option = makeOption()
		const poll = makePoll({ options: [option] })

		const result = poll.removeOption(option.id, poll.ownerId)

		expect(poll.options).toHaveLength(0)
		expect(result).not.toBeDefined()
	})
	
	it('should not remove an option by a member that does not own it', () => {
		const option = makeOption()
		const poll = makePoll({ options: [option] })
	
		const result = poll.removeOption(option.id, randomUUID())
	
		expect(poll.options).toHaveLength(1)
		expect(result.value).toBeInstanceOf(UnauthorizedError)
	})

	it('should not remove an option in a poll that has been finished', () => {
		const option = makeOption()
		const finishedPoll = makePoll({
			duration: {
				type: 'temporary',
				endDate: new Date()
			},
			options: [option]
		})

		const result = finishedPoll.removeOption(option.id, finishedPoll.ownerId)

		expect(finishedPoll.isFinished()).toBeTruthy()
		expect(result.value).toBeInstanceOf(PollAlreadyFinishedError)
		expect(finishedPoll.options.length).toBe(1)
	})

	it('should not remove an option that does not exists', () => {
		const poll = makePoll()

		const result = poll.removeOption(randomUUID(), poll.ownerId)

		expect(poll.options).toHaveLength(0)
		expect(result.value).toBeInstanceOf(NotFoundError)
	})

	it('should vote in an option of a poll', () => {
		const option = makeOption({ votes: [makeVote(), makeVote()] }, randomUUID(), new Date())

		const poll = makePoll({ options: [option] })

		const result = poll.vote(option.id, makeVote())

		expect(result).not.toBeDefined()
		expect(poll.options[0].votes).toHaveLength(3)
	})

	it('should not vote in an option that does not exist in a poll', () => {
		const poll = makePoll()

		const result = poll.vote(randomUUID(), makeVote())

		expect(result.value).toBeInstanceOf(NotFoundError)
	})

	it('should not vote in an option of a poll that has been finished', () => {
		const option = makeOption()

		const finishedPoll = makePoll({
			duration: {
				type: 'temporary',
				endDate: new Date()
			},
			options: [option]
		})

		const result = finishedPoll.vote(option.id, makeVote())

		expect(result.value).toBeInstanceOf(PollAlreadyFinishedError)
	})

	it('should show the results of a poll', () => {
		const poll = makePoll(
			{
				options: [
					makeOption(
						{
							name: 'Vandal',
							votes: [makeVote(), makeVote(), makeVote()]
						},
						randomUUID(),
						new Date()
					),
					makeOption(
						{
							name: 'Phantom',
							votes: [makeVote(), makeVote(), makeVote()]
						},
						randomUUID(),
						new Date()
					),
					makeOption(
						{
							name: 'Operator',
							votes: [makeVote(), makeVote()]
						},
						randomUUID(),
						new Date()
					),
					makeOption(
						{
							name: 'Sheriff',
							votes: [makeVote(), makeVote()]
						},
						randomUUID(),
						new Date()
					)
				]
			},
			randomUUID(),
			new Date()
		)

		poll.options[0].addVote(makeVote())

		const results = poll.showResults()

		expect(results).toStrictEqual([
			{ name: 'Vandal', percentage: 36.4 },
			{ name: 'Phantom', percentage: 27.3 },
			{ name: 'Operator', percentage: 18.2 },
			{ name: 'Sheriff', percentage: 18.2 }
		])
	})
})
