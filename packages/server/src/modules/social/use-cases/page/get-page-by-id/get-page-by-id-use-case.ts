import { Page } from 'modules/social/domain/page/page'
import { IPageRepository } from 'modules/social/repositories/page-repository'
import { UseCase } from 'shared/contracts/application/use-case'
import { NotFoundError } from 'shared/errors/not-found-error'
import { Either, left, right } from 'shared/logic/either'

type Input = {
	id: string
}

type Output = Either<NotFoundError, Page>

export class GetPageByIdUseCase implements UseCase<Input, Output> {
    constructor(private pageRepository: IPageRepository) {}

    async execute({ id }: Input): Promise<Output> {
        const page = await this.pageRepository.findById(id)
        const pageNotFound = !page

        if(pageNotFound) {
            return left(new NotFoundError('Page', id))
        }

        return right(page)
    }
}
