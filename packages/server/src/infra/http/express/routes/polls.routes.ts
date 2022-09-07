import { Router } from 'express'

import { adaptRoute } from 'shared/contracts/infra/adapters/express/adapt-route-to-express'
import { adaptMiddleware } from 'shared/contracts/infra/adapters/express/adapt-middleware-to-express'
import { ensureAuthenticatedMiddleware } from 'shared/middlewares/ensure-authenticated-middleware'

import { createPollController } from 'modules/social/use-cases/poll/create-poll'

const pollsRouter = Router()

pollsRouter.use(adaptMiddleware(ensureAuthenticatedMiddleware))

pollsRouter.post('/', adaptRoute(createPollController))

export { pollsRouter }
