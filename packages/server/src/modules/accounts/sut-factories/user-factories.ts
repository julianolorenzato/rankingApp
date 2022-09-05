import {
	Email,
	IEmailProps,
	IPasswordProps,
	IUsernameProps,
	IUserProps,
	Password,
	User,
	Username
} from '../domain/user'

export namespace UserFactories {
	export const makeUsername = ({ value = 'darkest' }: Partial<IUsernameProps> = {}) => {
		return Username.create({
			value
		}).value as Username
	}

	export const makeEmail = ({ value = 'darkest@best.com' }: Partial<IEmailProps> = {}) => {
		return Email.create({
			value
		}).value as Email
	}

	export const makePassword = ({ value = 'iamthebest123' }: Partial<IPasswordProps> = {}) => {
		return Password.create({
			value
		}).value as Password
	}

	export const makeUser = (
		{ username = makeUsername(), email = makeEmail(), password = makePassword() }: Partial<IUserProps> = {},
		id?: string,
		createdAt?: Date
	) => {
		return User.create(
			{
				username,
				email,
				password
			},
			id,
			createdAt
		)
	}
}
