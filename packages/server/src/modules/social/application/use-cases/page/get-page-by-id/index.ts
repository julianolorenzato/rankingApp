import { GetPageByIdUseCase } from './get-page-by-id-use-case'
import { GetPageByIdController } from './get-page-by-id-controller'
import { inMemoryPageRepositoryInstance } from 'modules/social/infra/repositories/in-memory/page-repository'

const getPageByIdUseCase = new GetPageByIdUseCase(inMemoryPageRepositoryInstance)
const getPageByIdController = new GetPageByIdController(getPageByIdUseCase)

export { getPageByIdController }
