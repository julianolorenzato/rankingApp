import { Request, Response } from 'express'
import { IMemberDTO } from 'modules/social/dtos/member-dto'
import { GetMembersUseCase } from './get-members-use-case'

export class GetMembersController {
	constructor(private getMembersUseCase: GetMembersUseCase) {}

	async handle(req: Request, res: Response) {
		const amount = req.query.amount as string

		try {
			const result = await this.getMembersUseCase.execute({
				amount: parseInt(amount)
			})

			const response: IMemberDTO[] = result.map(member => ({
				id: member.id,
				userId: member.props.userId,
				username: member.props.username.value,
				reputation: member.props.reputation,
				createdAt: member.createdAt
			}))

			return res.status(200).json(response)
		} catch (e) {
			if (e instanceof Error) return res.status(500).json({ error: e.message })
		}
	}
}
