import { Either, right, left } from 'shared/logic/either'

import { sign, verify } from 'jsonwebtoken'
import { auth } from 'config/auth'

import { User } from '../domain/user/user'

import { UnauthorizedError } from 'shared/errors/unauthorized-error'

interface JWTTokenPayload {
	userId: string
	username: string
}

interface JWTData {
	payload: JWTTokenPayload
	token: string
}

// type Errors = AccessTokenMustBeProvidedError | UnauthorizedError

export class JWT implements JWTData {
	public readonly payload: JWTTokenPayload
	public readonly token: string

	private constructor({ payload, token }: JWTData) {
		this.payload = payload
		this.token = token
	}

	static signUser(user: User): JWT {
		const payload: JWTTokenPayload = {
			username: user.username.value,
			userId: user.id
		}

		const token = sign(payload, auth.secretKey, {
			expiresIn: auth.expiresIn
		})

		const jwt = new JWT({
			payload,
			token
		})

		return jwt
	}

	static verifyUserToken(token: string): Either<UnauthorizedError, JWT> {
		try {
			const decoded = verify(token, auth.secretKey) as JWTTokenPayload

			const jwt = new JWT({
				payload: {
					userId: decoded.userId,
					username: decoded.username
				},
				token
			})

			return right(jwt)
		} catch (e) {
			return left(new UnauthorizedError())
		}
	}
}
