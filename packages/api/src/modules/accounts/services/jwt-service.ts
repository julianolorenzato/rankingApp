import { Either, right, left } from 'shared/logic/either'

import { sign, verify } from 'jsonwebtoken'
import { auth } from '../../../shared/config/auth'

import { User } from '../domain/user/User'

import { InvalidJWTTokenError } from './errors/invalid-jwt-token-error'
import { AccessDeniedError } from 'modules/accounts/services/errors/access-denied-error'

interface JWTData {
	userId: string
	token: string
}

interface JWTTokenPayload {
	exp: number
	sub: string
}

type Errors = InvalidJWTTokenError | AccessDeniedError

export class JWT {
	public readonly userId: string
	public readonly token: string

	private constructor({ userId, token }: JWTData) {
		this.userId = userId
		this.token = token
	}

	static signUser(user: User): JWT {
		const token = sign({ userId: user.id }, auth.secretKey, {
			expiresIn: auth.expiresIn
		})

		const jwt = new JWT({ userId: user.id, token })

		return jwt
	}

	static verifyUserToken(token?: string): Either<Errors, JWT> {
		if(!token) {
			return left(new InvalidJWTTokenError())
		}

		try {
			const decoded = verify(token, auth.secretKey) as JWTTokenPayload

			const jwt = new JWT({
				userId: decoded.sub,
				token
			})

			return right(jwt)
		} catch (e) {
			return left(new AccessDeniedError())
		}
	}
}
