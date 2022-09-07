import { Duration } from 'modules/social/domain/poll/poll'
import { IPollDTO } from 'modules/social/dtos/poll-dto'
import { Controller } from 'shared/contracts/infra/controller'
import { HttpResponse } from 'shared/contracts/infra/http-response'
import { CreatePollUseCase } from './create-poll-use-case'

type RequestData = {
	title: string
	payload: {
		userId: string
	}
	pageId: string
	duration: Duration
	optionNames: string[]
}

export class CreatePollController extends Controller<RequestData, IPollDTO> {
    constructor(private createPollUseCase: CreatePollUseCase) {
        super()
    }

	protected async handle(requestData: RequestData): Promise<HttpResponse> {
		const {
			title,
			pageId,
			optionNames,
			duration,
			payload: { userId }
		} = requestData

        const output = await this.createPollUseCase.execute({
            title,
            pageId,
            userId,
            duration,
            optionNames
        })

        if(output.isLeft()) {
            const error = output.value
            return this.clientError(error)
        }

        const response: IPollDTO = {
            id: output.value.id,
            title: output.value.title.value,
            pageId: output.value.pageId,
            owner: output.value.owner,
            duration: output.value.duration,
            options: output.value.options
        }

        return this.created(response)
	}
}
