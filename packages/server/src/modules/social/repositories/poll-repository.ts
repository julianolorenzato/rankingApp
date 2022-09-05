import { Poll } from '../domain/poll/poll'

export interface IPollRepository {
	save: (poll: Poll) => Promise<void>
}
