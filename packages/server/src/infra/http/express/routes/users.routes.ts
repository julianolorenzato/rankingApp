import { Router } from 'express'

import { registerUserController } from 'modules/accounts/use-cases/register-user'
import { authUserController } from 'modules/accounts/use-cases/auth-user'
import { adaptRoute } from 'shared/adapters/http/express/adapt-route'

const usersRouter = Router()

usersRouter.post('/register', adaptRoute(registerUserController))

usersRouter.post('/auth/login', (req, res) => {
    return authUserController.handle(req, res)
})

export { usersRouter }