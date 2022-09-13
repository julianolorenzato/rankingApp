import { Router } from 'express'

import { adaptRoute } from 'shared/contracts/infra/adapters/express/adapt-route-to-express'
import { createPageController } from 'modules/social/use-cases/page/create-page'
import { adaptMiddleware } from 'shared/contracts/infra/adapters/express/adapt-middleware-to-express'
import { ensureAuthenticatedMiddleware } from 'shared/middlewares/ensure-authenticated-middleware'
import { getPageByIdController } from 'modules/social/use-cases/page/get-page-by-id'

const pagesRouter = Router()

pagesRouter.post('/', adaptMiddleware(ensureAuthenticatedMiddleware), adaptRoute(createPageController))

pagesRouter.get('/:id', adaptRoute(getPageByIdController))

export { pagesRouter }
