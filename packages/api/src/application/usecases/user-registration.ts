import { User, UserProps } from '@/domain/entities/user'
import { UserRepository } from '../protocols/user-repository'

export class UserRegistration {
	private readonly userRepository: UserRepository

    constructor (userRepo: UserRepository) {
        this.userRepository = userRepo
    }

    async exec(userProps: UserProps): Promise<User> {
        const user = User.create(userProps)
        return user
    }
}
