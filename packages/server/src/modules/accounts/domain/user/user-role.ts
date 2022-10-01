import { ValueObject } from 'shared/contracts/domain/value-object'

type RoleTypes = 'admin' | 'user'

interface IUserRoleProps {
	role: RoleTypes
}

export class UserRole extends ValueObject<IUserRoleProps> {
	private constructor(props: IUserRoleProps) {
		super(props)
	}

	get role(): RoleTypes {
		return this.props.role
	}

	static create(props: IUserRoleProps): UserRole {
		return new UserRole(props)
	}
}
