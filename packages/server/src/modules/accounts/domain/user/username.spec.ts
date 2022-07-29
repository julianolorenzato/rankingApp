import { InvalidLengthError } from "shared/errors/invalid-length-error"
import { Username } from "./username"

describe('VO: user/username', () => {
    it('should ble able to create a new username', () => {
		const testValue = 'username with spaces'
		const username = Username.create({ value: testValue })

		expect(username.value).toBeInstanceOf(Username)
		expect(username.value).toEqual({
			props: {
				value: testValue
			}
		})
	})

	it('should not be able to create a username with less than 3 chars', () => {
		const shortValue = 'jk'
		const shortUsername = Username.create({ value: shortValue })

		expect(shortUsername.value).toBeInstanceOf(InvalidLengthError)
		expect(shortUsername.value).toStrictEqual(new InvalidLengthError('username', shortValue))
	})

	it('should not be able to create a username with more than 20 chars', () => {
		const longValue = 'aVeryLargePasswordHowCanIRememberThis????'
		const longUsername = Username.create({ value: longValue })

		expect(longUsername.value).toBeInstanceOf(InvalidLengthError)
		expect(longUsername.value).toStrictEqual(new InvalidLengthError('username', longValue))
	})
})