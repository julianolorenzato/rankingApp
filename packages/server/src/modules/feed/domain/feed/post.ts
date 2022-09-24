import { Poll } from "modules/social/domain/poll/poll";
import { Entity } from "shared/contracts/domain/entity";

interface PollValue {
    type: 'poll'
    poll: Poll
}

interface ArticleValue {
    type: 'article'
    article: 'Article'
}
export interface IPostProps {
    value: PollValue | ArticleValue
}

export class Post extends Entity<IPostProps> {
    private constructor(props: IPostProps, id?: string, createdAt?: Date) {
        super(props, id, createdAt)
    }

    get score(): number {
        return this.calcScore()
    }

    get value(): PollValue | ArticleValue {
        return this.props.value
    }

    private calcScore() {
        const { value } = this.props
        
        let score: number

        if (value.type === 'poll') {
            const poll = value.poll

            score = 25
            poll.duration.type === 'temporary' ? score += 15 : score += 10
        }

        return score
    }

    static create(props: IPostProps, id?: string, createdAt?: Date) {
        const content = new Post(props, id, createdAt)
        content.calcScore()

        return content
    }
}