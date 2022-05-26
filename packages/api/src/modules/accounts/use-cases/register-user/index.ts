import { RegisterUserController } from './register-user-controller'
import { RegisterUserUseCase } from './register-user-use-case'
import { inMemoryUserRepositoryInstace } from 'modules/accounts/repositories/in-memory/in-memory-user-repository'

const registerUserUseCase = new RegisterUserUseCase(
	inMemoryUserRepositoryInstace
)
const registerUserController = new RegisterUserController(registerUserUseCase)

export { registerUserController }
