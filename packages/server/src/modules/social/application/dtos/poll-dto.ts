import { OptionId, PageId, PollId, VoteId } from "shared/contracts/domain/ids"

interface IVoteDTO {
    memberId: string
    pollId: string
    optionId: string
    id: VoteId
    createdAt: Date
}

interface IOptionDTO {
    name: string
    votes: IVoteDTO[]
    id: OptionId
    createdAt: Date
}

export interface IPollDTO {
    title: string
    ownerId: string
    pageId: PageId
    duration: {
        type: 'permanent' | 'temporary'
        endDate?: Date
    }
    options: IOptionDTO[]
    id: PollId
    createdAt: Date
}