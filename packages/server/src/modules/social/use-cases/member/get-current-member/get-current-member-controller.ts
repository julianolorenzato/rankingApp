import { Request, Response } from 'express'
import { IMemberDTO } from 'modules/social/dtos/member-dto'
import { GetMemberByUsernameUseCase } from '../get-member-by-username/get-member-by-username-use-case'

export class GetCurrentMemberController {
    constructor(private getMemberByUsernameUseCase: GetMemberByUsernameUseCase) {} 

	async handle(req: Request, res: Response) {
        const { username } = req.body.payload

        try {

            const result = await this.getMemberByUsernameUseCase.execute({ username })
            
            if(result.isLeft()) {
                const error = result.value.message
				return res.status(404).json({ error })
            }

            const response: IMemberDTO = {
                id: result.value.id,
                userId: result.value.props.userId,
                username: result.value.username.value,
                reputation: result.value.props.reputation,
                createdAt: result.value.createdAt
            }

            return res.status(200).json(response)
        } catch(e) {
            if (e instanceof Error) return res.status(500).json({ error: e.message })
        }

    }
}
