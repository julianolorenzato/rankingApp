import { Router } from 'express'

import { registerUserController } from 'modules/accounts/use-cases/register-user'
import { authUserController } from 'modules/accounts/use-cases/auth-user'

const usersRouter = Router()

usersRouter.post('/register', (req, res) => {
    return registerUserController.handle(req, res)
})

usersRouter.post('/auth/login', (req, res) => {
    return authUserController.handle(req, res)
})

export { usersRouter }