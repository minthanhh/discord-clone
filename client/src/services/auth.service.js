import {http} from '../utilities'

class AuthService {
	async login(data) {
		return await http.post('/auth/login', data)
	}
	async register(data) {
		return await http.post('/auth/register', data)
	}
	async logout() {
		await http.post('/auth/logout')
	}
}

export const authService = new AuthService()
