import { Router } from 'express'

const usersRouter = Router()

usersRouter.post('/', (req, res) => {
    const { username, email, password } = req.body
})

export { usersRouter }