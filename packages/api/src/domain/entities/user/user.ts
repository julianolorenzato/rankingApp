import { UserProps } from './user-props'

export class User implements UserProps {
	id
	username
	email
	createdAt

	private constructor({id, username, email, createdAt}: UserProps) {
		this.id = id
		this.username = username
		this.email = email
		this.createdAt = createdAt
	}

	static create(props: UserProps) {
		return new User(props)
	}
}