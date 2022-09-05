import { inMemoryPageRepositoryInstance } from 'modules/social/repositories/implementations/in-memory-page-repository'
import { CreatePageUseCase } from './create-page-use-case'
import { CreatePageController } from './create-page-controller'

const createPageUseCase = new CreatePageUseCase(inMemoryPageRepositoryInstance)
const createPageController = new CreatePageController(createPageUseCase)

export { createPageController }
