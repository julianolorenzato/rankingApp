import { ValueObject } from 'shared/contracts/domain/value-object'
import { Either, left, right } from 'shared/logic/either'
import bcrypt from 'bcrypt'

import { InvalidLengthError } from 'shared/errors/invalid-length-error'

export interface IPasswordProps {
	value: string
	hashed?: boolean
}

export class Password extends ValueObject<IPasswordProps> {
	public static MIN_LENGTH = 7 as const
	public static MAX_LENGTH = 40 as const

	private constructor(props: IPasswordProps) {
		//props.value = props.value.trim()
		super(props)
	}

	private static validate(password: string): boolean {
		const len = password.length

		if (len > this.MAX_LENGTH || len < this.MIN_LENGTH) {
			return false
		}

		return true
	}

	// Por que não hashear no momento do create e ter uma senha hasheada sempre? Sem ter que fazer verificações
	public async getHashedPassword(): Promise<string> {
		if (this.props.hashed) {
			return this.props.value
		}

		return await bcrypt.hash(this.props.value, 8)
	}

	public async comparePassword(plainTextPassword: string): Promise<boolean> {
		if (this.props.hashed) {
			return await bcrypt.compare(plainTextPassword, this.props.value)
		}

		return plainTextPassword === this.props.value
	}

	static create({
		value,
		hashed = false
	}: IPasswordProps): Either<Error, Password> {
		value = value.trim()

		if (!hashed && !this.validate(value)) {
			return left(new InvalidLengthError('password'))
		}

		return right(new Password({ value, hashed }))
	}
}
