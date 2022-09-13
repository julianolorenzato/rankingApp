import { Router } from 'express'

import { usersRouter } from './users.routes'
import { membersRouter } from './members.routes'
import { pagesRouter } from './pages.routes'
import { pollsRouter } from './polls.routes'

const router = Router()

router.use('/', usersRouter)
router.use('/members', membersRouter)
router.use('/pages', pagesRouter)
router.use('/polls', pollsRouter)

export { router }