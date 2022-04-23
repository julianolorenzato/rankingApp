export class Password {
	private readonly password

	private constructor(password: string) {
		this.password = password
	}

	get value(): string {
		return this.password
	}

	//validate(password) { either logic... }
	//format(password) { password.trim() }

	static create(password: string) {
		return new Password(password)
	}
}
