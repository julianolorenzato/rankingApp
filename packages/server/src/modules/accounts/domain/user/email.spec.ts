import { InvalidLengthError } from 'shared/errors/invalid-length-error'
import { Either } from 'shared/logic/either'
import { Email } from './email'
import { InvalidEmailFormatError } from './errors/invalid-email-format-error'

describe('VO - user/email', () => {
	it('should be able to create a new email', () => {
		const testValue = 'brownbear@bears.com'
		const email = Email.create({ value: testValue })

        expect(email.value).toBeInstanceOf(Email)
		expect(email.value).toEqual({
			props: {
				value: testValue
			}
		})
	})

	it('should not be able create an email with invalid format', () => {
		const testValue = 'an obviously invalid email format'
		const email = Email.create({ value: testValue })

		expect(email.value).not.toBeInstanceOf(Email)
		expect(email.value).toStrictEqual(new InvalidEmailFormatError(testValue))
	})

	it('should not be able create an email with invalid length', () => {
		const testValue = '@test.com'.padStart(300, '1')
		const email = Email.create({ value: testValue })

        expect(email.value).not.toBeInstanceOf(Email)
		expect(email.value).toStrictEqual(new InvalidLengthError('email', testValue))
	})
})
