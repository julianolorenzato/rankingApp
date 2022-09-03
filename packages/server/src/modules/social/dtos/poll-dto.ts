interface IVoteDTO {
    owner: string
    pollId: string
    optionId: string
}

interface IOptionDTO {
    name: string
    votes: IVoteDTO[]
}

export interface IPollDTO {
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