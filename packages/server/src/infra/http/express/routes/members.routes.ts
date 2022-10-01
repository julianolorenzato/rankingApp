import { Router } from 'express'

import { getMembersController } from 'modules/social/application/use-cases/member/get-members'
import { getCurrentMemberController } from 'modules/social/application/use-cases/member/get-current-member'
import { getMemberByUsernameController } from 'modules/social/application/use-cases/member/get-member-by-username'
import { adaptMiddleware } from 'shared/contracts/infra/adapters/express/adapt-middleware-to-express'
import { ensureAuthenticatedMiddleware } from 'shared/middlewares/ensure-authenticated-middleware'
import { adaptRoute } from 'shared/contracts/infra/adapters/express/adapt-route-to-express'

const membersRouter = Router()

membersRouter.use(adaptMiddleware(ensureAuthenticatedMiddleware))

membersRouter.get('/', adaptRoute(getMembersController))
membersRouter.get('/me', adaptRoute(getCurrentMemberController))
membersRouter.get('/:username', adaptRoute(getMemberByUsernameController))

export { membersRouter }
