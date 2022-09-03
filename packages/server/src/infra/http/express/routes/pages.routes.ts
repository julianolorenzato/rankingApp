import { Router } from 'express'

import { adaptRoute } from 'shared/contracts/infra/adapters/express/adapt-route-to-express'
import { createPageController } from 'modules/social/use-cases/page/create-page'
import { adaptMiddleware } from 'shared/contracts/infra/adapters/express/adapt-middleware-to-express'
import { ensureAuthenticatedMiddleware } from 'shared/middlewares/ensure-authenticated-middleware'

const pagesRouter = Router()

pagesRouter.use(adaptMiddleware(ensureAuthenticatedMiddleware))

pagesRouter.post('/create', adaptRoute(createPageController))

export { pagesRouter }
