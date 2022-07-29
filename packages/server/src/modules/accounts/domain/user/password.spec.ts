import { InvalidLengthError } from 'shared/errors/invalid-length-error'
import { IPasswordProps, Password } from './password'
import bcrypt from 'bcrypt'

describe('VO - user/password', () => {
	it('should ble able to create a new password', () => {
		const testValue = 'password with spaces, i should change it'
		const password = Password.create({ value: testValue })

		expect(password.value).toBeInstanceOf(Password)
		expect(password.value).toEqual({
			props: {
				hashed: false,
				value: testValue
			}
		})
	})

	it('should not be able to create a password with invalid length', () => {
		const shortValue = 'aVeryLargePasswordHowCanIRememberThis????'
		const longPassword = Password.create({ value: shortValue })

		expect(longPassword.value).toBeInstanceOf(InvalidLengthError)
		expect(longPassword.value).toStrictEqual(new InvalidLengthError('password'))

		const longValue = 'sh'
		const shortPassword = Password.create({ value: longValue })

		expect(shortPassword.value).toBeInstanceOf(InvalidLengthError)
		expect(shortPassword.value).toStrictEqual(new InvalidLengthError('password'))
	})

	it('should be able to hash a password', async () => {
		const value = '123456789'
		const password = Password.create({ value }).value as Password

		const hashedPassword = await password.getHashedPassword()

		expect(await bcrypt.compare(value, hashedPassword)).toBeTruthy()
	})

	it('should not be able to hash a password already hashed', async () => {
		const hashedPassword = await bcrypt.hash('123456789', 8)
		const passProps: IPasswordProps = {
			value: hashedPassword,
			hashed: true
		}

		const password = Password.create(passProps).value as Password

		expect(await password.getHashedPassword()).toEqual(hashedPassword)
	})

    // Why???
	it('should be able to compare the password when not hashed', async () => {
		const value = '123456789'
		const password = Password.create({ value }).value as Password

		expect(password.comparePassword(value)).toBeTruthy()
	})

    // Obviously
    it('should be able to compare the password when hashed', async () => {
        const value = '123456789'
        const hashedPass = await bcrypt.hash(value, 8)
        const passProps: IPasswordProps = {
            value: hashedPass,
            hashed: true
        }

        const password = Password.create(passProps).value as Password
        
        expect(password.comparePassword(value)).toBeTruthy()
    })
})
