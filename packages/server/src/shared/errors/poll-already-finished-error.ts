export class PollAlreadyFinishedError extends Error {
	constructor(pollTitle: string) {
		super(`The poll ${pollTitle} has been finished`)
		this.name = 'PollAlreadyFinishedError'
	}
}
