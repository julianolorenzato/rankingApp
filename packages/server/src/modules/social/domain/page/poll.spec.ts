import { randomUUID } from 'crypto'
import { NotFoundError } from 'shared/errors/not-found-error'
import { IPollProps, Poll } from './poll'

describe('Entity - poll', () => {
    let pollProps: IPollProps = {
        title: 'Which is the Valorant best gun',
        options: [
            {
                name: 'Vandal',
                votes: 234
            },
            {
                name: 'Phantom',
                votes: 201
            },
            {
                name: 'Operator',
                votes: 112
            },
            {
                name: 'Sheriff',
                votes: 78
            }
        ]
    }

    it('should create an existing poll', () => {
        const poll = Poll.create(pollProps, randomUUID(), new Date())

        expect(poll).toBeInstanceOf(Poll)
        expect(poll).toHaveProperty('id')
        expect(poll).toHaveProperty('createdAt')
        expect(poll.props).toStrictEqual(pollProps)
        expect(poll.options[0].votes).toBe(234)
    })
    
	it('should create a new poll with 0 votes options', () => {
        const poll = Poll.create(pollProps)
        
        expect(poll).toBeInstanceOf(Poll)
        expect(poll).toHaveProperty('id')
        expect(poll).toHaveProperty('createdAt')
        expect(poll.props).toStrictEqual(pollProps)
        expect(poll.options[0].votes).toBe(0)
	})

    it('should register votes in an option', () => {
        const poll = Poll.create(pollProps)

        poll.vote('Vandal')
        poll.vote('Vandal')
        poll.vote('Vandal')

        expect(poll.options['0'].votes).toBe(3)
    })

    it('should not register votes in an option that does not exists', () => {
        const poll = Poll.create(pollProps)

        const result = poll.vote('Ghost')

        expect(poll.options[0].votes).toBe(0)
        expect(result.value).toBeInstanceOf(NotFoundError)
    })
})
