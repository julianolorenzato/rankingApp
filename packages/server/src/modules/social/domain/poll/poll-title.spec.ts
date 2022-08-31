import { InvalidLengthError } from "shared/errors/invalid-length-error"
import { PollTitle } from './poll-title'

describe('VO - poll/poll-title', () => {
    it('should ble able to create a new PageDescription', () => {
		const testValue = 'Some cool description'
		const pollTitle = PollTitle.create({ value: testValue })

		expect(pollTitle.value).toBeInstanceOf(PollTitle)
		expect(pollTitle.value).toEqual({
			props: {
				value: testValue
			}
		})
	})

	it('should not be able to create a PollTitle with less than 5 chars', () => {
		const shortValue = 'four'
		const shortPollTitle = PollTitle.create({ value: shortValue })

		expect(shortPollTitle.value).toBeInstanceOf(InvalidLengthError)
		expect(shortPollTitle.value).toStrictEqual(new InvalidLengthError('poll title', shortValue))
	})

	it('should not be able to create a PollTitle with more than 80 chars', () => {
		const longValue = ''.padStart(81, '1')
		const longPollTitle = PollTitle.create({ value: longValue })

		expect(longPollTitle.value).toBeInstanceOf(InvalidLengthError)
		expect(longPollTitle.value).toStrictEqual(new InvalidLengthError('poll title', longValue))
	})
})