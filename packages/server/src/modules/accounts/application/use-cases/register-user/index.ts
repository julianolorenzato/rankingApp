import { RegisterUserController } from './register-user-controller'
import { RegisterUserUseCase } from './register-user-use-case'
import { inMemoryUserRepositoryInstace } from 'modules/accounts/infra/repositories/in-memory/user-repository'

const registerUserUseCase = new RegisterUserUseCase(
	inMemoryUserRepositoryInstace
)
const registerUserController = new RegisterUserController(registerUserUseCase)

export { registerUserController }
