export class MemberAlreadyVotedError extends Error {
	constructor(value: string) {
		super(`Member ${value} already voted in this option`)
		this.name = 'MemberAlreadyVotedError'
	}
}
