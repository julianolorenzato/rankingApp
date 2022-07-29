import { Router } from 'express'

import { usersRouter } from './users.routes'
import { membersRouter } from './members.routes'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated-middleware'

const router = Router()

router.use('/', usersRouter)
router.use('/members', ensureAuthenticated, membersRouter)

export { router }