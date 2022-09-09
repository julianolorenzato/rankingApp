import { IPageDTO } from 'modules/social/dtos/page-dto'
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

        const response: IPageDTO = {
            id: output.value.id,
            createdAt: output.value.createdAt,
            title: output.value.title.value,
            description: output.value.description.value,
            slug: output.value.slug,
            ownerId: output.value.ownerId,
            followerIds: output.value.followerIds,
            pollIds: output.value.pollIds
        }

        return this.ok(response)
    }
}
