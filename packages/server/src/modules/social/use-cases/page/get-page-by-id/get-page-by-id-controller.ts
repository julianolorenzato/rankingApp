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
            title: output.value.title.value,
            description: output.value.description.value,
            slug: output.value.slug,
            owner: output.value.owner,
            followers: output.value.followers,
            polls: output.value.polls.map(poll => ({
                id: poll.id,
                title: poll.title.value,
                pageId: poll.pageId,
                owner: poll.owner,
                duration: poll.duration,
                options: poll.options.map(option => ({
                    id: option.id,
                    name: option.name,
                    votes: option.votes.map(vote => ({
                        id: vote.id,
                        owner: vote.owner,
                        pollId: vote.pollId,
                        optionId: vote.optionId
                    }))
                }))
            }))
        }

        return this.ok(response)
    }
}
