import { InvalidPollTitleLengthError } from './errors/InvalidTitleLengthError'

export class PollDescription {
	private readonly description

	private constructor(description: string) {
		this.description = description
	}

	get value(): string {
		return this.description
	}

	//validate(email) { either logic... }
	//format(email) { email.trim() }

	static create(description: string) {
		if (description.length > 12) throw new InvalidPollDescriptionLengthError(description)

		return new PollTitle(title)
	}
}
