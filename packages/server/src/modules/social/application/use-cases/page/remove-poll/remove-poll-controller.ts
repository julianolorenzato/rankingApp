import { Controller } from 'shared/contracts/infra/controller'
import { HttpResponse } from 'shared/contracts/infra/http-response'
import { NotFoundError } from 'shared/errors/not-found-error'
import { RemovePollUseCase } from './remove-poll-use-case'

type RequestData = {
	payload: {
		userId: string
	}
	pageId: string
	pollId: string
}

export class RemovePollController extends Controller<RequestData, void> {
	constructor(private removePollUseCase: RemovePollUseCase) {
		super()
	}

	protected async handle(requestData: RequestData): Promise<HttpResponse> {
		const {
			pageId,
			pollId,
			payload: { userId }
		} = requestData

		const output = await this.removePollUseCase.execute({ pageId, pollId, userId })

		if (output?.isLeft()) {
			switch (output.value.name) {
				case 'NotFoundError': {
					const error = output.value
					return this.notFound(error)
				}
				case 'Unauthorized': {
					const error = output.value
					return this.unauthorized(error)
				}
			}
		}

        return this.ok()
	}
}
