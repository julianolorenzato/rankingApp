import { InMemoryUserRepository } from "modules/accounts/repositories/in-memory/in-memory-user-repository"
import { IUserRepository } from "modules/accounts/repositories/user-repository"
import { RegisterUserUseCase } from "../register-user/register-user-use-case"
import { AuthUserUseCase, TokenResponse } from "./auth-user-use-case"
import { InvalidEmailOrPasswordError } from "./errors/invalid-email-or-password-error"

describe('UseCase - AuthUser', () => {
    let userRepository: IUserRepository
    let authUserUseCase: AuthUserUseCase
    let registerUserUseCase: RegisterUserUseCase

    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        authUserUseCase = new AuthUserUseCase(userRepository)
        registerUserUseCase = new RegisterUserUseCase(userRepository)
    })

    it('should auth an user with correct credentials', async () => {
        await registerUserUseCase.execute({
            username: 'thedarkrobot',
            email: 'ghosthunter@tdb.com',
            password: 'imsosmart'
        })

        const result = await authUserUseCase.execute({
            email: 'ghosthunter@tdb.com',
            password: 'imsosmart'
        })

        expect(result.value).toHaveProperty('token')
        expect((result.value as TokenResponse).token).toBeDefined()
    })

    it('should not auth an user with wrong password', async () => {
        await registerUserUseCase.execute({
            username: 'thedarkrobot',
            email: 'ghosthunter@tdb.com',
            password: 'imsosmart'
        })

        const result = await authUserUseCase.execute({
            email: 'ghosthunter@tdb.com',
            password: 'wrongpass'
        })

        expect(result.value).toBeInstanceOf(InvalidEmailOrPasswordError)
    })

    it('should not auth an user with wrong email', async () => {
        await registerUserUseCase.execute({
            username: 'thedarkrobot',
            email: 'ghosthunter@tdb.com',
            password: 'imsosmart'
        })

        const result = await authUserUseCase.execute({
            email: 'wrongemail@tdb.com',
            password: 'imsosmart'
        })

        expect(result.value).toBeInstanceOf(InvalidEmailOrPasswordError)
    })

    it('should not auth an user that does not exists', async () => {
        const result = await authUserUseCase.execute({
            email: 'wrongemail@tdb.com',
            password: 'imsosmart'
        })

        expect(result.value).toBeInstanceOf(InvalidEmailOrPasswordError)
    })
})