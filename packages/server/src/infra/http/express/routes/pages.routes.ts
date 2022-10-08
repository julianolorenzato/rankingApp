import { Router } from 'express'

import { adaptRoute } from 'shared/contracts/infra/adapters/express/adapt-route-to-express'
import { createPageController } from 'modules/social/application/use-cases/page/create-page'
import { adaptMiddleware } from 'shared/contracts/infra/adapters/express/adapt-middleware-to-express'
import { ensureAuthenticatedMiddleware } from 'shared/middlewares/ensure-authenticated-middleware'
import { getPageByIdController } from 'modules/social/application/use-cases/page/get-page-by-id'
import { followPageController } from 'modules/social/application/use-cases/page/follow-page'
import { addPollController } from 'modules/social/application/use-cases/page/add-poll'
import { removePollController } from 'modules/social/application/use-cases/page/remove-poll'
import { unfollowPageController } from 'modules/social/application/use-cases/page/unfollow-page'

const pagesRouter = Router()

pagesRouter.post('/', adaptMiddleware(ensureAuthenticatedMiddleware), adaptRoute(createPageController))

pagesRouter.get('/:id', adaptRoute(getPageByIdController))

pagesRouter.post('/:pageId/addPoll', adaptMiddleware(ensureAuthenticatedMiddleware), adaptRoute(addPollController))

pagesRouter.delete(
	'/:pageId/removePoll/:pollId',
	adaptMiddleware(ensureAuthenticatedMiddleware),
	adaptRoute(removePollController)
)

pagesRouter.post('/:pageId/follow', adaptMiddleware(ensureAuthenticatedMiddleware), adaptRoute(followPageController))

pagesRouter.delete(
	'/:pageId/unfollow',
	adaptMiddleware(ensureAuthenticatedMiddleware),
	adaptRoute(unfollowPageController)
)

export { pagesRouter }
