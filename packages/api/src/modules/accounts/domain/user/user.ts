import { Entity } from 'shared/domain/entity'

import { Username } from './username'
import { Email } from './email'
import { Password } from './password'

interface IUserProps {
	username: Username
	email: Email
	password: Password
}

export class User extends Entity<IUserProps> {
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
		return new User(props, id, createdAt)
	}
}
