import { Post } from "modules/feed/domain/feed/post";
import { Poll } from "modules/social/domain/poll/poll";
import { UseCase } from "shared/contracts/application/use-case";

type Input = {
    poll: Poll
}

type Output = Content

export class CreateContentUseCase implements UseCase<Input, Output> {
    execute({ poll }: Input): Content {
        const content = Content.create({ value: { type: 'poll', poll } })

        return content
    }
}