import { Duration } from 'modules/social/domain/poll/poll'
import { IPollDTO, toPollDTO } from 'modules/social/application/dtos/poll-dto'
import { Controller } from 'shared/contracts/infra/controller'
import { HttpResponse } from 'shared/contracts/infra/http-response'
import { AddPollUseCase } from './add-poll-use-case'

type RequestData = {
	title: string
	payload: {
		userId: string
	}
	pageId: string
	duration: Duration
	optionNames: string[]
}

export class AddPollController extends Controller<RequestData, IPollDTO> {
    constructor(private addPollUseCase: AddPollUseCase) {
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

        const output = await this.addPollUseCase.execute({
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

        const response = toPollDTO(output.value)

        return this.created(response)
	}
}
