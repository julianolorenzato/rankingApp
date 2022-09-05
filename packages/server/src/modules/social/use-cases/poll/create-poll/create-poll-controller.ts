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
			payload: { userId: ownerId }
		} = requestData

        const output = await this.createPollUseCase.execute({
            title,
            pageId,
            ownerId,
            duration,
            optionNames
        })

        if(output.isLeft()) {
            const error = output.value
            return this.clientError(error)
        }

        const response: IPollDTO = {
            title: output.value.title.value,
            duration: output.value.duration,
            owner: output.value.owner,
            options: output.value.options,
            pageId: output.value.pageId
        }

        return this.ok(response)
	}
}
