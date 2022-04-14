import { User, UserProps } from '@/domain/entities/user'
import { UsersRepository } from '../repositories/users-repositories'

export class UserRegistration {
	private readonly userRepository: UsersRepository

    constructor (userRepo: UsersRepository) {
        this.userRepository = userRepo
    }

    async exec(userProps: UserProps): Promise<User> {
        const user = User.new(userProps)
    }
}
