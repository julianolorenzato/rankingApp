import { IPageDTO } from 'modules/social/application/dtos/page-dto'
import { PageMapper } from 'modules/social/infra/mappers/page-mapper'
import { Controller } from 'shared/contracts/infra/controller'
import { HttpResponse } from 'shared/contracts/infra/http-response'
import { GetPageByIdUseCase } from './get-page-by-id-use-case'

type RequestData = {
	id: string
}

export class GetPageByIdController extends Controller<RequestData, IPageDTO> {
	constructor(private getPageByIdUseCase: GetPageByIdUseCase) {
		super()
	}

	protected async handle(req: RequestData): Promise<HttpResponse> {
        const { id } = req

        const output = await this.getPageByIdUseCase.execute({ id })

        if(output.isLeft()) {
            const error = output.value
            return this.clientError(error)
        }

        const response = PageMapper.toDTO(output.value)

        return this.ok(response)
    }
}
