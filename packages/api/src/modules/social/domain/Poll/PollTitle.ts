import { InvalidPollTitleLengthError } from './errors/InvalidTitleLengthError'

export class PollTitle {
	private readonly title

	private constructor(title: string) {
		this.title = title
	}

	get value(): string {
		return this.title
	}

	//validate(email) { either logic... }
	//format(email) { email.trim() }

	static create(title: string) {
		if (title.length > 12) throw new InvalidPollTitleLengthError(title)

		return new PollTitle(title)
	}
}
