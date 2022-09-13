import { GetPollsByPageSlugController } from './get-polls-by-page-slug-controller'
import { GetPollsByPageSlugUseCase } from './get-polls-by-page-slug-use-case'
import { inMemoryPollRepositoryInstance } from 'modules/social/repositories/implementations/in-memory-poll-repository'
import { inMemoryPageRepositoryInstance } from 'modules/social/repositories/implementations/in-memory-page-repository'

const getPollsByPageSlugUseCase = new GetPollsByPageSlugUseCase(
	inMemoryPollRepositoryInstance,
	inMemoryPageRepositoryInstance
)

const getPollsByPageSlugController = new GetPollsByPageSlugController(getPollsByPageSlugUseCase)

export { getPollsByPageSlugController }
