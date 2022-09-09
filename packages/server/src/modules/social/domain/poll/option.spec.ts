import { randomUUID } from 'crypto'
import { InvalidLengthError } from 'shared/errors/invalid-length-error'
import { Option } from './option'
import { Vote } from './vote'
import { PollFactories } from '../../sut-factories/poll-factories'
import { MemberAlreadyVotedError } from 'shared/errors/member-already-voted-error'

describe('Entity - option', () => {
	const { makeOption, makeVote } = PollFactories

	const vote0 = Vote.create({
		optionId: randomUUID(),
		memberId: randomUUID(),
		pollId: randomUUID()
	})

	const vote1 = Vote.create({
		optionId: randomUUID(),
		memberId: randomUUID(),
		pollId: randomUUID()
	})

	const vote2 = Vote.create({
		optionId: randomUUID(),
		memberId: randomUUID(),
		pollId: randomUUID()
	})

	it('should create an option', () => {
		const option = Option.create({
			name: 'Some name',
			votes: [vote0, vote1, vote2]
		})

		expect(option.value).toBeInstanceOf(Option)
		expect(option.value).toHaveProperty('id')
		expect(option.value).toHaveProperty('createdAt')
	})

	it('should create a new option', () => {
		const option = Option.create({
			name: 'Some name',
			votes: [vote0, vote1]
		}).value as Option

		expect(option.votes.length).toBe(0)
	})

	it('should create an existing option', () => {
		const option = Option.create(
			{
				name: 'Some name',
				votes: [vote0, vote1]
			},
			randomUUID(),
			new Date()
		).value as Option

		expect(option.votes.length).toBe(2)
	})

	it('should not create an option with less than min characters', () => {
		const option = Option.create({
			name: '',
			votes: [vote0, vote1, vote2]
		})

		expect(option.value).toBeInstanceOf(InvalidLengthError)
	})

	it('should not create an option with more than max characters', () => {
		const option = Option.create({
			name: ''.padStart(60, '1'),
			votes: [vote0, vote1, vote2]
		})

		expect(option.value).toBeInstanceOf(InvalidLengthError)
	})

	it('should add a vote to an option', () => {
		const option = Option.create(
			{
				name: 'generic option',
				votes: [vote1]
			},
			randomUUID(),
			new Date()
		).value as Option

		option.addVote(vote2)

		expect(option.votes.length).toBe(2)
		expect(option.votes[0]).toStrictEqual(vote1)
		expect(option.votes[1]).toStrictEqual(vote2)
	})

	it('should not add a vote from a member who has already voted for that option', () => {
		const memberId = randomUUID()

		const option = makeOption()

		const vote1 = makeVote({ memberId })
		const vote2 = makeVote({ memberId })

		const result1 = option.addVote(vote1)
		const result2 = option.addVote(vote2)

		expect(result1).not.toBeDefined()
		expect(result2.value).toBeInstanceOf(MemberAlreadyVotedError)
	})
})
