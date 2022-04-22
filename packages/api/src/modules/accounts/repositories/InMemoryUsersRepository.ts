import { User } from "../entities/User";
import { IUsersRepository } from "./IUsersRepository";

export class InMemoryUserRepository implements IUsersRepository {
    public items: User[] = []

    findByUsername(username: string): Promise<User> {
        const user = this.items.find(user => user.username === username)
        return
    }

    save(user: User): Promise<void> {
        
    }
}