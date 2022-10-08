import { Controller } from 'shared/contracts/infra/controller'
import { HttpResponse } from 'shared/contracts/infra/http-response'
import { UnfollowPageUseCase } from './unfollow-page-use-case'

type RequestData = {
	pageId: string
	payload: {
		userId: string
	}
}

export class UnfollowPageController extends Controller<RequestData, void> {
	constructor(private unfollowPageUseCase: UnfollowPageUseCase) {
		super()
	}

	protected async handle(requestData: RequestData): Promise<HttpResponse> {
		const {
			pageId,
			payload: { userId }
		} = requestData

        const output = await this.unfollowPageUseCase.execute({ pageId, userId })

        if(output?.isLeft()) {
            const error = output.value
            return this.notFound(error)
        }

        return this.ok()
	}
}
