import { Router } from 'express'

import { adaptRoute } from 'shared/contracts/infra/adapters/express/adapt-route-to-express'
import { adaptMiddleware } from 'shared/contracts/infra/adapters/express/adapt-middleware-to-express'
import { ensureAuthenticatedMiddleware } from 'shared/middlewares/ensure-authenticated-middleware'

import { getPollsByPageSlugController } from 'modules/social/application/use-cases/poll/get-polls-by-page-slug'
import { voteInAPollController } from 'modules/social/application/use-cases/poll/vote-in-a-poll'

const pollsRouter = Router()

pollsRouter.get('/page/:pageSlug', adaptRoute(getPollsByPageSlugController))

pollsRouter.post(
	'/:pollId/vote/:optionId',
	adaptMiddleware(ensureAuthenticatedMiddleware),
	adaptRoute(voteInAPollController)
)

export { pollsRouter }
