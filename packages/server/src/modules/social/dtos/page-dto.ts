import { IPollDTO } from './poll-dto'

export interface IPageDTO {
	title: string
	slug: string
	description: string
    owner: string
	followers: string[]
	polls: IPollDTO[]
}
