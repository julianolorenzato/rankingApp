import { User } from "modules/accounts/domain/user"

export interface UserDTO {
    id: string
    username: string
    email: string
}

export function toUserDTO(entity: User): UserDTO {
    return {
        id: entity.id,
        username: entity.username.value,
        email: entity.email.value
    }
}