import { Router } from 'express'

import { usersRouter } from './users.routes'
import { membersRouter } from './members.routes'
import { pagesRouter } from './pages.routes'
import { pollsRouter } from './polls.routes'

import { adaptMiddleware } from 'shared/contracts/infra/adapters/express/adapt-middleware-to-express'
import { ensureAuthenticatedMiddleware } from 'shared/middlewares/ensure-authenticated-middleware'

const router = Router()

router.use('/', usersRouter)
router.use('/members', /* adaptMiddleware(ensureAuthenticatedMiddleware), */ membersRouter)
router.use('/pages', pagesRouter)
router.use('/polls', pollsRouter)

export { router }