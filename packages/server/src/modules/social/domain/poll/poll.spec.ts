import { randomUUID } from 'crypto'
import { AlreadyExistsError } from 'shared/errors/already-exists-error'
import { NotFoundError } from 'shared/errors/not-found-error'
import { PollAlreadyFinishedError } from 'shared/errors/poll-already-finished-error'
import { Option } from './option'
import { Vote } from './vote'
import { Duration, IPollProps, Poll } from './poll'
import { PollTitle } from './poll-title'
import { PollFactories } from '../../sut-factories/poll-factories'

describe('Agreggate root - poll', () => {
	const { makePoll, makePollTitle, makeOption, makeVote } = PollFactories

	// let votes: Vote[]
	// let option1: Option
	// let option2: Option
	// let option3: Option
	// let option4: Option
	// let pollTitle: PollTitle
	// let pollProps: IPollProps
	// let poll: Poll
	// let finishedPoll: Poll

	// beforeEach(() => {
	// 	votes = []

	// 	for (let i = 0; i < 10; i++) {
	// 		votes.push(
	// 			Vote.create({
	// 				memberId: randomUUID(),
	// 				optionId: randomUUID(),
	// 				pollId: randomUUID()
	// 			})
	// 		)
	// 	}

	// 	option1 = Option.create(
	// 		{
	// 			name: 'Vandal',
	// 			votes: [votes[0], votes[1], votes[2]]
	// 		},
	// 		randomUUID(),
	// 		new Date()
	// 	).value as Option

	// 	option2 = Option.create(
	// 		{
	// 			name: 'Phantom',
	// 			votes: [votes[3], votes[4], votes[5]]
	// 		},
	// 		randomUUID(),
	// 		new Date()
	// 	).value as Option

	// 	option3 = Option.create(
	// 		{
	// 			name: 'Operator',
	// 			votes: [votes[6], votes[7]]
	// 		},
	// 		randomUUID(),
	// 		new Date()
	// 	).value as Option

	// 	option4 = Option.create(
	// 		{
	// 			name: 'Sheriff',
	// 			votes: [votes[8], votes[9]]
	// 		},
	// 		randomUUID(),
	// 		new Date()
	// 	).value as Option

	// 	pollTitle = PollTitle.create({ value: 'Which is the Valorant best gun' }).value as PollTitle

	// 	pollProps = {
	// 		title: pollTitle,
	// 		options: [option1, option2, option3, option4],
	// 		owner: randomUUID(),
	// 		pageId: randomUUID(),
	// 		duration: {
	// 			type: 'permanent'
	// 		}
	// 	}

	// 	poll = Poll.create(pollProps, randomUUID(), new Date())
	// 	finishedPoll = Poll.create({
	// 		...pollProps,
	// 		duration: {
	// 			...pollProps.duration,
	// 			type: 'temporary',
	// 			endDate: new Date()
	// 		}
	// 	})
	// })

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
