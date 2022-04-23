import { Entity } from '@shared/domain/Entity'

import { Username } from './Username'
import { Email } from './Email'
import { Password } from './Password'

type UserProps = {
	username: Username
	email: Email
	password: Password
	createdAt: Date
}

export class User extends Entity<UserProps> {
	private constructor(props: UserProps, id?: string) {
		super(props, id)
	}

	get username() {
		return this.props.username.value
	}

	get email() {
		return this.props.email.value
	}
	
	get password() {
		return this.props.password.value
	}

	static create(props: UserProps, id?: string) {
		return new User(props, id)
	}
}