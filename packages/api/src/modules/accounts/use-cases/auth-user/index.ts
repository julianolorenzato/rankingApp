import { AuthUserController } from './auth-user-controller'
import { AuthUserUseCase } from './auth-user-use-case'
import { inMemoryUserRepositoryInstace } from 'modules/accounts/repositories/in-memory/in-memory-user-repository'

const authUserUseCase = new AuthUserUseCase(
	inMemoryUserRepositoryInstace
)
const authUserController = new AuthUserController(authUserUseCase)

export { authUserController }
