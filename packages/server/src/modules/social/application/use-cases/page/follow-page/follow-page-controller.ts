import { Controller } from 'shared/contracts/infra/controller'
import { HttpResponse } from 'shared/contracts/infra/http-response'
import { FollowPageUseCase } from './follow-page-use-case'

type RequestData = {
	pageId: string
	payload: {
		userId: string
	}
}

export class FollowPageController extends Controller<RequestData, void> {
	constructor(private followPageUseCase: FollowPageUseCase) {
		super()
	}

	protected async handle(requestData: RequestData): Promise<HttpResponse> {
		const {
			pageId,
			payload: { userId }
		} = requestData

        const output = await this.followPageUseCase.execute({ pageId, userId })

        if(output?.isLeft()) {
            const error = output.value
            return this.notFound(error)
        }

        return this.ok()
	}
}
