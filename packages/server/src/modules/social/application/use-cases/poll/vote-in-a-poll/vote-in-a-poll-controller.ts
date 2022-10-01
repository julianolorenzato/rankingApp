import { Controller } from 'shared/contracts/infra/controller'
import { HttpResponse } from 'shared/contracts/infra/http-response'
import { VoteInAPollUseCase } from './vote-in-a-poll-use-case'

type RequestData = {
	pollId: string
	optionId: string
	payload: {
		userId: string
	}
}

export class VoteInAPollController extends Controller<RequestData, void> {
	constructor(private voteInAPollUseCase: VoteInAPollUseCase) {
		super()
	}

	protected async handle(req: RequestData): Promise<HttpResponse> {
		const {
			pollId,
			optionId,
			payload: { userId }
		} = req

		const output = await this.voteInAPollUseCase.execute({
			pollId,
			optionId,
			userId
		})

		if (output?.isLeft()) {
			const error = output.value
			return this.notFound(error)
		}

        return this.ok()
	}
}
