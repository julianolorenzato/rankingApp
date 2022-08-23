import { InvalidLengthError } from "shared/errors/invalid-length-error"
import { PageDescription } from './page-description'

describe('VO - page/page-description', () => {
    it('should ble able to create a new PageDescription', () => {
		const testValue = 'Some cool description'
		const pageDescription = PageDescription.create({ value: testValue })

		expect(pageDescription.value).toBeInstanceOf(PageDescription)
		expect(pageDescription.value).toEqual({
			props: {
				value: testValue
			}
		})
	})

	it('should not be able to create a PageDescription with less than 10 chars', () => {
		const shortValue = 'ninechars'
		const shortPageDescription = PageDescription.create({ value: shortValue })

		expect(shortPageDescription.value).toBeInstanceOf(InvalidLengthError)
		expect(shortPageDescription.value).toStrictEqual(new InvalidLengthError('page description', shortValue))
	})

	it('should not be able to create a PageDescription with more than 400 chars', () => {
		const longValue = ''.padStart(401, '1')
		const longPageDescription = PageDescription.create({ value: longValue })

		expect(longPageDescription.value).toBeInstanceOf(InvalidLengthError)
		expect(longPageDescription.value).toStrictEqual(new InvalidLengthError('page description', longValue))
	})
})