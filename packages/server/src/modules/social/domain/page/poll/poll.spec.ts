import { randomUUID } from 'crypto'
import { AlreadyExistsError } from 'shared/errors/already-exists-error'
import { NotFoundError } from 'shared/errors/not-found-error'
import { PollAlreadyFinishedError } from 'shared/errors/poll-already-finished-error'
import { Option } from './option'
import { OptionVote } from './option-vote'
import { IPollProps, Poll } from './poll'

describe('Entity - poll', () => {
	let votes: OptionVote[]
	let option1: Option
	let option2: Option
	let option3: Option
	let option4: Option
	let pollProps: IPollProps
	let poll: Poll
	let finishedPoll: Poll

	beforeEach(() => {
		votes = []

		for (let i = 0; i < 10; i++) {
			votes.push(
				OptionVote.create({
					owner: randomUUID(),
					optionId: randomUUID(),
					pollId: randomUUID()
				})
			)
		}

		option1 = Option.create(
			{
				name: 'Vandal',
				votes: [votes[0], votes[1], votes[2]]
			},
			randomUUID(),
			new Date()
		).value as Option

		option2 = Option.create(
			{
				name: 'Phantom',
				votes: [votes[3], votes[4], votes[5]]
			},
			randomUUID(),
			new Date()
		).value as Option

		option3 = Option.create(
			{
				name: 'Operator',
				votes: [votes[6], votes[7]]
			},
			randomUUID(),
			new Date()
		).value as Option

		option4 = Option.create(
			{
				name: 'Sheriff',
				votes: [votes[8], votes[9]]
			},
			randomUUID(),
			new Date()
		).value as Option

		pollProps = {
			title: 'Which is the Valorant best gun',
			options: [option1, option2, option3, option4],
			owner: randomUUID(),
			pageId: randomUUID(),
			duration: {
				type: 'permanent'
			}
		}

		poll = Poll.create(pollProps, randomUUID(), new Date())
		finishedPoll = Poll.create({
			...pollProps,
			duration: {
				...pollProps.duration,
				type: 'temporary',
				endDate: new Date()
			}
		})
	})

	it('should create a poll', () => {
		expect(poll).toBeInstanceOf(Poll)

		expect(poll).toHaveProperty('id')
		expect(poll).toHaveProperty('createdAt')
		expect(poll).toHaveProperty('title', pollProps.title)
		expect(poll).toHaveProperty('options', pollProps.options)
		expect(poll).toHaveProperty('duration', pollProps.duration)

		expect(poll.options[0].votes.length).toBe(3)
	})

	it('should create a new option', () => {
		const option = Option.create({
			name: 'Ghost',
			votes: []
		}).value as Option

		const result = poll.addOption(option)

		expect(result).not.toBeDefined()
		expect(poll.options.length).toBe(5)
	})

	it('should not create an option in a poll that has been finished', () => {
		const option = Option.create({
			name: 'Ghost',
			votes: []
		}).value as Option

		const result = finishedPoll.addOption(option)

		expect(result.value).toBeInstanceOf(PollAlreadyFinishedError)
		expect(finishedPoll.options.length).toBe(4)
	})

	it('should not create an option with a name that already exists', () => {
		const option = Option.create({
			name: 'Vandal',
			votes: []
		}).value as Option

		const result = poll.addOption(option)

		expect(result.value).toBeInstanceOf(AlreadyExistsError)
		expect(poll.options.length).toBe(4)
	})

	it('should vote in an option of a poll', () => {
		const result = poll.vote(option1.id, votes[3])

		expect(result).not.toBeDefined()
		expect(option1.votes).toHaveLength(4)
		expect(poll.options[0].votes).toHaveLength(4)
	})

	it('should not vote in an option that does not exist in a poll', () => {
		const result = poll.vote('123', votes[3])

		expect(result.value).toBeInstanceOf(NotFoundError)
	})

	it('should not vote in an option of a poll that has been finished', () => {
		const result = finishedPoll.vote(option1.id, votes[3])

		expect(result.value).toBeInstanceOf(PollAlreadyFinishedError)
	})

	it('should show the results of a poll', () => {
		poll.options[0].addVote(votes[1])

		const results = poll.showResults()

		expect(results).toStrictEqual([
			{ name: 'Vandal', percentage: 36.4 },
			{ name: 'Phantom', percentage: 27.3 },
			{ name: 'Operator', percentage: 18.2 },
			{ name: 'Sheriff', percentage: 18.2 }
		])
	})
})
