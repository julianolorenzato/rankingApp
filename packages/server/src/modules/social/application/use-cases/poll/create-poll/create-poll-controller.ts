import { Duration } from 'modules/social/domain/poll/poll'
import { IPollDTO } from 'modules/social/application/dtos/poll-dto'
import { PollMapper } from 'modules/social/infra/mappers/poll-mapper'
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

        const response = PollMapper.toDTO(output.value)

        return this.created(response)
	}
}
