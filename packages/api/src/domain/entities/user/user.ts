import { Email } from './email'
import { Username } from './username'

export type UserProps = {
	//id: string
	username: Username
	email: Email
	createdAt: Date
}

export class User implements UserProps {
	username
	email
	createdAt

	private constructor({username, email, createdAt}: UserProps) {
		this.username = username
		this.email = email
		this.createdAt = createdAt
	}

	static create(props: UserProps) {
		return new User(props)
	}
}