import { Router } from 'express'

import { getMembersController } from 'modules/social/use-cases/member/get-members'
import { getCurrentMemberController } from 'modules/social/use-cases/member/get-current-member'
import { getMemberByUsernameController } from 'modules/social/use-cases/member/get-member-by-username'

const membersRouter = Router()

membersRouter.get('/', (req, res) => {
    return getMembersController.handle(req, res)
})

membersRouter.get('/me', (req, res) => {
    return getCurrentMemberController.handle(req, res)
}) 

membersRouter.get('/:username', (req, res) => {
    return getMemberByUsernameController.handle(req, res)
})

export { membersRouter }