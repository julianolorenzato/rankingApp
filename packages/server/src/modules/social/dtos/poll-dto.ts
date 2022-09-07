interface IVoteDTO {
    id: string
    owner: string
    pollId: string
    optionId: string
}

interface IOptionDTO {
    id: string
    name: string
    votes: IVoteDTO[]
}

export interface IPollDTO {
    id: string
    title: string
    owner: string
    options: IOptionDTO[]
    pageId: string
    duration: {
        type: 'permanent' | 'temporary'
        endDate?: Date
    }
    // results: {
    //     name: string
    //     percentage: number
    // }[]
}