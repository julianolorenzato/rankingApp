import { Either, right, left } from 'shared/logic/either'

import { JwtPayload, sign, verify } from 'jsonwebtoken'
import { auth } from '../../../shared/config/auth'

import { User } from '../domain/user/User'

import { InvalidJWTTokenError } from './errors/invalid-jwt-token-error'
import { AccessDeniedError } from 'modules/accounts/services/errors/access-denied-error'

interface JWTTokenPayload {
	userId: string
	username: string
}

interface JWTData {
	payload: JWTTokenPayload
	token: string
}

type Errors = InvalidJWTTokenError | AccessDeniedError

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

	static verifyUserToken(token?: string): Either<Errors, JWT> {
		if (!token) {
			return left(new InvalidJWTTokenError())
		}

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
			return left(new AccessDeniedError())
		}
	}
}
