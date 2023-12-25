import {SocketStore} from '../../store'
import {socketCheckAuth} from '../middlewares'
import {Socket} from '../providers'
import {updateFriendsPendingInvitations} from '../providers/socket/handler'

export class SocketService {
	static initializer(http) {
		const io = Socket.getInstance(http)

		SocketStore.setSocketInstance(io)

		io.use(socketCheckAuth)

		io.on('connection', (socket) => {
			SocketStore.addNewConnectedUser(socket.id, socket.user._id)
			updateFriendsPendingInvitations(socket.user._id)

			socket.on('disconnect', () => {
				SocketStore.removeConnectedUser(socket.id)
			})
		})
	}
}
