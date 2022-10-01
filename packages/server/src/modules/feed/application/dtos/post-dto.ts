import { IPollDTO } from "modules/social/application/dtos/poll-dto"
import { type } from "os"

interface CasePoll {
    type: 'poll'
    poll: IPollDTO
}

interface CaseArticle {
    type: 'article'
    article: 'not implemented yet'
}

export type IPostDTO = CasePoll | CaseArticle