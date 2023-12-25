import {Friend} from '../../../models'
import {SocketStore} from '../../../store'

export const updateFriendsPendingInvitations = async (userId) => {
	const io = SocketStore.getSocketInstance()
	const pendingFriendsInvitations = await Friend.find({receiverId: userId}).populate('senderId', '_id username email')
	const listReceiver = SocketStore.getActiveConnections(userId.toString())

	listReceiver.forEach((receiverId) => {
		io.to(receiverId).emit('friends-invitations', {
			pendingFriendsInvitations: pendingFriendsInvitations ? pendingFriendsInvitations : [],
		})
	})
}
