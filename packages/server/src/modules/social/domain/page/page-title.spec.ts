import { InvalidLengthError } from "shared/errors/invalid-length-error"
import { PageTitle } from './page-title'

describe('VO - page/page-title', () => {
    it('should ble able to create a new PageTitle', () => {
		const testValue = 'Some cool title'
		const pageTitle = PageTitle.create({ value: testValue })

		expect(pageTitle.value).toBeInstanceOf(PageTitle)
		expect(pageTitle.value).toEqual({
			props: {
				value: testValue
			}
		})
	})

	it('should not be able to create a PageTitle with less than 1 chars', () => {
		const shortValue = ''
		const shortPageTitle = PageTitle.create({ value: shortValue })

		expect(shortPageTitle.value).toBeInstanceOf(InvalidLengthError)
		expect(shortPageTitle.value).toStrictEqual(new InvalidLengthError('page title', shortValue))
	})

	it('should not be able to create a PageTitle with more than 40 chars', () => {
		const longValue = ''.padStart(41, '1')
		const longPageTitle = PageTitle.create({ value: longValue })

		expect(longPageTitle.value).toBeInstanceOf(InvalidLengthError)
		expect(longPageTitle.value).toStrictEqual(new InvalidLengthError('page title', longValue))
	})
})