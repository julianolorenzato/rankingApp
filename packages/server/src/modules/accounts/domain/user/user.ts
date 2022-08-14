import { AggregateRoot } from 'base/domain/aggregate-root'

import { Username } from './username'
import { Email } from './email'
import { Password } from './password'
import { UserRegistered } from './events/user-registered'

interface IUserProps {
	username: Username
	email: Email
	password: Password
}

export class User extends AggregateRoot<IUserProps> {
	private constructor(props: IUserProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt)
	}

	get username(): Username {
		return this.props.username
	}

	get email(): Email {
		return this.props.email
	}

	get password(): Password {
		return this.props.password
	}

	static create(props: IUserProps, id?: string, createdAt?: Date) {
		const isNewUser = !id
		const user = new User(props, id, createdAt)

		if (isNewUser) {
			user.addDomainEvent(new UserRegistered(user))
		}

		return user
	}
}
