import { IPageDTO, toPageDTO } from 'modules/social/application/dtos/page-dto'
import { PageMapper } from 'modules/social/infra/mappers/page-mapper'
import { Controller } from 'shared/contracts/infra/controller'
import { HttpResponse } from 'shared/contracts/infra/http-response'
import { CreatePageUseCase } from './create-page-use-case'

type RequestData = {
	title: string
	description: string
	payload: {
		userId: string
	}
}

type ResponseDTO = IPageDTO

export class CreatePageController extends Controller<RequestData, ResponseDTO> {
	constructor(private createPageUseCase: CreatePageUseCase) {
		super()
	}

	protected async handle(requestData: RequestData): Promise<HttpResponse> {
		const {
			title,
			description,
			payload: { userId }
		} = requestData

		const output = await this.createPageUseCase.execute({
			title,
			description,
			userId
		})

        if (output.isLeft()) {
            const error = output.value
            return this.clientError(error)
        }

		const response = toPageDTO(output.value)

        return this.created(response)
	}
}
