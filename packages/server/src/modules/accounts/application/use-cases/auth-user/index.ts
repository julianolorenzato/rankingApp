import { AuthUserController } from './auth-user-controller'
import { AuthUserUseCase } from './auth-user-use-case'
import { inMemoryUserRepositoryInstace } from '../../../infra/repositories/in-memory/user-repository'

const authUserUseCase = new AuthUserUseCase(
	inMemoryUserRepositoryInstace
)
const authUserController = new AuthUserController(authUserUseCase)

export { authUserController }
