import {http} from '../utilities'

class FriendService {
	async invite(data) {
		return await http.post('/friend/invite', data)
	}
	async accept(data) {
		return await http.post('/friend/accept', data)
	}
	async reject(data) {
		return await http.post('/friend/reject', data)
	}
}

export const friendService = new FriendService()
