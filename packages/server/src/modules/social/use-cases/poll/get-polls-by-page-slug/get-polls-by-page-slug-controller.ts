import { IPollDTO } from 'modules/social/dtos/poll-dto'
import { PollMapper } from 'modules/social/mappers/poll-mapper'
import { Controller } from 'shared/contracts/infra/controller'
import { HttpResponse } from 'shared/contracts/infra/http-response'
import { GetPollsByPageSlugUseCase } from './get-polls-by-page-slug-use-case'

type RequestData = {
	pageSlug: string
}

export class GetPollsByPageSlugController extends Controller<RequestData, IPollDTO[]> {
	constructor(private getPollsByPageSlugUseCase: GetPollsByPageSlugUseCase) {
		super()
	}

	protected async handle(req: RequestData): Promise<HttpResponse> {
		const { pageSlug } = req

		const output = await this.getPollsByPageSlugUseCase.execute({ slug: pageSlug })

		if (output.isLeft()) {
			const error = output.value
			return this.notFound(error)
		}

		const response = output.value.map(poll => PollMapper.toDTO(poll))

		return this.ok(response)
	}
}
