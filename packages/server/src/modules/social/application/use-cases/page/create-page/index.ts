import { inMemoryPageRepositoryInstance } from 'modules/social/infra/repositories/in-memory/page-repository'
import { CreatePageUseCase } from './create-page-use-case'
import { CreatePageController } from './create-page-controller'
import { inMemoryMemberRepositoryInstance } from 'modules/social/infra/repositories/in-memory/member-repository'

const createPageUseCase = new CreatePageUseCase(inMemoryPageRepositoryInstance, inMemoryMemberRepositoryInstance)
const createPageController = new CreatePageController(createPageUseCase)

export { createPageController }
