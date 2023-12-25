import {socket} from '../utilities'
import {setPendingFriendsInvitations} from '../store/slices'
class SocketService {
	connect(dispatch) {
		socket.on('connect', () => {
			console.log(socket.id)
		})

		socket.on('friends-invitations', (data) => {
			console.log(data)
			const {pendingFriendsInvitations} = data
			dispatch(setPendingFriendsInvitations(pendingFriendsInvitations))
		})
	}

	friendInvitation() {}
}

export const socketService = new SocketService()
