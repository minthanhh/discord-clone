import {sign, verify} from 'jsonwebtoken'
import {Env} from '../constants'

function JsonWebToken() {
	const _options = {
		expiresIn: Env.PRIVATE_EXPIRES_IN,
	}

	const generateToken = (payload) => {
		return sign(payload, Env.PRIVATE_JWT_SECRET, _options)
	}

	const verifyToken = (token) => {
		return verify(token, Env.PRIVATE_JWT_SECRET, _options)
	}

	return {generateToken, verifyToken}
}

export const Token = JsonWebToken()
