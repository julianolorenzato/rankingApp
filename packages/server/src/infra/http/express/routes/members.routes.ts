import { Router } from 'express'

import { getMembersController } from 'modules/social/use-cases/member/get-members'
import { getCurrentMemberController } from 'modules/social/use-cases/member/get-current-member'
import { getMemberByUsernameController } from 'modules/social/use-cases/member/get-member-by-username'
import { adaptMiddleware } from 'shared/contracts/infra/adapters/express/adapt-middleware-to-express'
import { ensureAuthenticatedMiddleware } from 'shared/middlewares/ensure-authenticated-middleware'
import { adaptRoute } from 'shared/contracts/infra/adapters/express/adapt-route-to-express'

const membersRouter = Router()

membersRouter.get('/', (req, res) => {
	return getMembersController.handle(req, res)
})

membersRouter.get('/me', adaptMiddleware(ensureAuthenticatedMiddleware), adaptRoute(getCurrentMemberController))

membersRouter.get('/:username', (req, res) => {
	return getMemberByUsernameController.handle(req, res)
})

export { membersRouter }
