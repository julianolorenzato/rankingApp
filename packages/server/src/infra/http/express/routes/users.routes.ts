import { Router } from 'express'

import { registerUserController } from 'modules/accounts/application/use-cases/register-user'
import { authUserController } from 'modules/accounts/application/use-cases/auth-user'
import { adaptRoute } from 'shared/contracts/infra/adapters/express/adapt-route-to-express'

const usersRouter = Router()

usersRouter.post('/register', adaptRoute(registerUserController))
usersRouter.post('/auth/login', adaptRoute(authUserController))

export { usersRouter }
