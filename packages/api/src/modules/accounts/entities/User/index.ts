import { v4 as uuid } from 'uuid'
import { Email } from './Email'
import { Username } from './Username'

export type UserProps = {
	username: Username
	email: Email
	createdAt: Date
}

export class User implements UserProps {
	id
	username
	email
	createdAt

	private constructor({ username, email, createdAt }: UserProps, id?: string) {
		this.username = username
		this.email = email
		this.createdAt = createdAt
		this.id = id || uuid()
	}

	static create(props: UserProps) {
		return new User(props)
	}
}