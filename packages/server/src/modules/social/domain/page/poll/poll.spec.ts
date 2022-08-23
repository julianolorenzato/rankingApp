import { randomUUID } from 'crypto'
import { NotFoundError } from 'shared/errors/not-found-error'
import { Option } from './option'
import { OptionVote } from './option-vote'
import { IPollProps, Poll } from './poll'

describe('Entity - poll', () => {
	const votes: OptionVote[] = []

	for (let i = 0; i < 10; i++) {
		votes.push(
			OptionVote.create({
				owner: randomUUID(),
				optionId: randomUUID(),
				pollId: randomUUID()
			})
		)
	}

	const option1 = Option.create(
		{
			name: 'Vandal',
			votes: [votes[0], votes[1], votes[2]]
		},
		randomUUID(),
		new Date()
	).value as Option

	const option2 = Option.create(
		{
			name: 'Phantom',
			votes: [votes[3], votes[4], votes[5]]
		},
		randomUUID(),
		new Date()
	).value as Option

	const option3 = Option.create(
		{
			name: 'Operator',
			votes: [votes[6], votes[7]]
		},
		randomUUID(),
		new Date()
	).value as Option

	const option4 = Option.create(
		{
			name: 'Sheriff',
			votes: [votes[8], votes[9]]
		},
		randomUUID(),
		new Date()
	).value as Option

	let pollProps: IPollProps = {
		title: 'Which is the Valorant best gun',
		options: [option1, option2, option3, option4],
		owner: randomUUID(),
		pageId: randomUUID()
	}

	it('should create a poll', () => {
		const poll = Poll.create(pollProps, randomUUID(), new Date())

		expect(poll).toBeInstanceOf(Poll)
		expect(poll).toHaveProperty('id')
		expect(poll).toHaveProperty('createdAt')
		expect(poll.props).toStrictEqual(pollProps)
		expect(poll.options[0].votes.length).toBe(3)
	})

})
