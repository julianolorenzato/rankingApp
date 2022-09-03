import { IPageDTO } from 'modules/social/dtos/page-dto'
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
			pageTitle: title,
			pageDescription: description,
			owner: userId
		})

        if (output.isLeft()) {
            const error = output.value
            return this.clientError(error)
        }

        const response: IPageDTO = {
            title: output.value.title.value,
            description: output.value.description.value,
            slug: output.value.slug,
            owner: output.value.owner,
            followers: output.value.followers,
            polls: output.value.polls.map(poll => ({
                title: poll.title.value,
                pageId: poll.pageId,
                owner: poll.owner,
                duration: poll.duration,
                options: poll.options.map(option => ({
                    name: option.name,
                    votes: option.votes.map(vote => ({
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
